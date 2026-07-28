import { readBlockConfig } from '../../scripts/aem.js';

const WRAPPER_SERVICE_URL = 'https://3635370-refdemoapigateway-stage.adobeioruntime.net/api/v1/web/ref-demo-api-gateway/fetch-cf';
const GRAPHQL_BASE_URL = 'https://publish-p153659-e1796191.adobeaemcloud.com/graphql/execute.json/global/';
const DEFAULT_VARIATION = 'gold';

/**
 * Extract config from block children rows
 * Expected structure from EDS/Universal Editor:
 * <div><div><p>value1</p></div></div>  -> versionselector
 * <div><div><p>value2</p></div></div>  -> graphqlendpoint
 * <div><div><p><a>value3</a></p></div></div> -> folderpath
 */
function extractConfigFromRows(block) {
  const config = {};
  const keys = ['versionselector', 'graphqlendpoint', 'folderpath'];

  Array.from(block.children).forEach((row, idx) => {
    if (!keys[idx]) return; // Only process first 3 rows
    // Use text, never the href: EDS lowercases hrefs and drops trailing
    // punctuation, which breaks case-sensitive content fragment paths.
    const value = row.textContent.trim();
    if (value) config[keys[idx]] = value;
  });

  return config;
}

function getHtml(value) {
  if (typeof value === 'string') return value;
  return value?.html || '';
}

function resolveVariant(block) {
  const container = block.closest('.tech-specs-features-container');
  const classes = new Set([
    ...Array.from(block.classList || []),
    ...Array.from(container?.classList || []),
  ]);

  const variantFromClass = Array.from(classes).find((cls) => /^tech-specs-features-(?:varient|variant)[123]$/.test(cls));
  const normalizedVariant = (variantFromClass || 'tech-specs-features-variant1').replace('varient', 'variant');
  const legacyVariant = normalizedVariant.replace('variant', 'varient');

  if (container) {
    container.classList.add(normalizedVariant, legacyVariant);
  }

  return normalizedVariant;
}

async function fetchData(variation, graphqlPath, folderPath) {
  // AEM publish sends no Access-Control-Allow-Origin, so the persisted query
  // cannot be called from the browser directly - it must go through the wrapper.
  // The wrapper forwards graphQLPath verbatim but maps its own cfPath to a
  // variable name this query does not use, so the matrix params are baked in here.
  const url = `${graphqlPath};variation=${variation};folderPath=${folderPath}`;

  try {
    const response = await fetch(WRAPPER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ graphQLPath: url, cfPath: folderPath, variation }),
    });

    if (!response.ok) {
      console.error('tech-specs-features: Wrapper request failed with status:', response.status);
      return null;
    }

    const data = await response.json();

    // Wrapper may return HTTP 200 with GraphQL validation errors.
    if (Array.isArray(data?.errors) && data.errors.length) {
      console.error('tech-specs-features: GraphQL errors:', data.errors);
      return null;
    }
    if (!data?.data) {
      console.error('tech-specs-features: No data in GraphQL response');
      return null;
    }

    const item = data?.data?.hiTechModelList?.items?.[0]
      || data?.data?.hiTechProductV3List?.items?.[0];
    if (!item) {
      console.error('tech-specs-features: No matching data structure found. Available keys:', Object.keys(data?.data || {}));
      return null;
    }

    const label = [item?.titleLabel || '', item?.descriptionLabel || ''];
    const cardNumbers = item?.cardNoLabel || [];
    const cardDetails = cardNumbers.map((no, index) => ({
      cardNoLabel: no,
      cardTitleLabel: item?.cardTitleLabel?.[index]?.html || '',
      cardDescriptionLabel: item?.cardDescriptionLabel?.[index]?.html || '',
    }));

    return { cardDetails, label };
  } catch (e) {
    console.error('tech-specs-features: Fetch failed:', e);
    return null;
  }
}

export default async function decorate(block) {
  const variant = resolveVariant(block);

  // Read config BEFORE emptying the block - both readers need the authored rows.
  // Try custom extraction first (for EDS/Universal Editor model rendering)
  let config = extractConfigFromRows(block);

  // Fallback to readBlockConfig for traditional Franklin structure
  if (!config.graphqlendpoint || !config.folderpath) {
    config = readBlockConfig(block);
  }

  block.textContent = '';

  // Require both graphql endpoint and folderpath to be authored - no fallback
  const graphqlEndpoint = config?.graphqlendpoint;
  const folderPath = config?.folderpath;
  if (!graphqlEndpoint || !folderPath) {
    console.warn('tech-specs-features: Missing required config. graphqlendpoint:', graphqlEndpoint, 'folderpath:', folderPath);
    return;
  }

  // Construct full GraphQL path from base URL + authored endpoint
  const graphqlPath = `${GRAPHQL_BASE_URL}${graphqlEndpoint}`;

  const selectedVersion = config.versionselector || config.version || DEFAULT_VARIATION;
  const variation = selectedVersion.toLowerCase().trim() || DEFAULT_VARIATION;

  const wrapper = document.createElement('div');
  const leftSide = document.createElement('div');
  const rightSide = document.createElement('div');

  wrapper.classList.add('tech-specs-features-inner-wrapper');
  leftSide.className = 'tech-specs-features-left-side';
  rightSide.className = 'tech-specs-features-right-side';
  wrapper.append(leftSide, rightSide);
  block.appendChild(wrapper);

  const data = await fetchData(variation, graphqlPath, folderPath);
  if (!data) {
    console.error('tech-specs-features: Failed to fetch data for variation:', variation);
    return;
  }

  leftSide.innerHTML = `<h2>${data?.label?.[0] || ''}</h2>
    ${getHtml(data?.label?.[1])}
  `;

  if (variant.endsWith('variant3')) {
    rightSide.innerHTML = data?.cardDetails?.map((card) => `
    <div class="tech-specs-features-card">
     <p>${card.cardNoLabel || ''}</p>
      <div class="tech-specs-features-card-content">
      ${card.cardTitleLabel || ''}
      ${card.cardDescriptionLabel || ''}
      </div>
    </div>`).join('');
  } else {
    rightSide.innerHTML = data?.cardDetails
      ?.map((card) => `<div class="tech-specs-features-card">
    <p>${card.cardNoLabel || ''}</p>
    ${card.cardTitleLabel || ''}
    ${card.cardDescriptionLabel || ''}
  </div>`)
      .join('');
  }
}
