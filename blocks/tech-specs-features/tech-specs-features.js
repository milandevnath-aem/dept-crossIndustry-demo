import { readBlockConfig } from '../../scripts/aem.js';

const WRAPPER_SERVICE_URL = 'https://3635370-refdemoapigateway-stage.adobeioruntime.net/api/v1/web/ref-demo-api-gateway/fetch-cf';
const GRAPHQL_BASE_URL = 'https://publish-p153659-e1796191.adobeaemcloud.com/graphql/execute.json/global/';
const DEFAULT_VARIATION = 'gold';

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
  const queryViaDirectGet = async () => {
    const directUrl = `${graphqlPath};variation=${variation};folderPath=${folderPath}`;
    console.log('tech-specs-features: Fetching via direct GET:', directUrl);
    const response = await fetch(directUrl, { method: 'GET' });
    if (!response.ok) {
      console.error('tech-specs-features: Direct GET failed with status:', response.status);
      return null;
    }

    const json = await response.json();
    if (Array.isArray(json?.errors) && json.errors.length) {
      console.error('tech-specs-features: GraphQL errors:', json.errors);
      return null;
    }
    if (!json?.data) {
      console.error('tech-specs-features: No data in GraphQL response');
      return null;
    }

    return json;
  };

  // Wrapper fallback if direct query is unavailable.
  const graphQLPaths = [graphqlPath];

  const bodyFor = (gqlPath) => ({
    graphQLPath: gqlPath,
    cfPath: folderPath,
    variation,
  });

  const requestData = async (graphQLPath) => {
    const response = await fetch(WRAPPER_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyFor(graphQLPath)),
    });

    if (!response.ok) return null;
    const json = await response.json();

    // Wrapper may return HTTP 200 with GraphQL validation errors.
    if (Array.isArray(json?.errors) && json.errors.length) return null;
    if (!json?.data) return null;

    return json;
  };

  try {
    let data = null;

    // Always try direct GET first with matrix params
    data = await queryViaDirectGet();

    // Fallback path: wrapper API if direct fails.
    if (!data) {
      console.log('tech-specs-features: Direct GET failed, trying wrapper API');
      for (let i = 0; i < graphQLPaths.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        data = await requestData(graphQLPaths[i]);
        if (data) break;
      }
    }

    if (!data) {
      console.error('tech-specs-features: No data returned from GraphQL');
      return null;
    }

    console.log('tech-specs-features: GraphQL response:', data);
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
    return null;
  }
}

export default async function decorate(block) {
  const variant = resolveVariant(block);
  const config = readBlockConfig(block);

  block.textContent = '';

  // Require both graphql endpoint and folderpath to be authored - no fallback
  const graphqlEndpoint = config.graphqlendpoint;
  const folderPath = config.folderpath;
  if (!graphqlEndpoint || !folderPath) {
    console.warn('tech-specs-features: Missing required config. graphqlendpoint:', graphqlEndpoint, 'folderpath:', folderPath);
    return;
  }

  // Construct full GraphQL path from base URL + authored endpoint
  const graphqlPath = `${GRAPHQL_BASE_URL}${graphqlEndpoint}`;

  const selectedVersion = config.versionselector || config.version || DEFAULT_VARIATION;
  const variation = selectedVersion.toLowerCase().trim() || DEFAULT_VARIATION;

  console.log('tech-specs-features: Config for this instance -', { graphqlEndpoint, graphqlPath, folderPath, variation });

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
