import { Asset } from '@alilc/lowcode-types';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { buildComponents, AssetLoader } from '@alilc/lowcode-utils';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const packages = JSON.parse(window.localStorage.getItem('packages') || '[]');
    const projectSchema = JSON.parse(
      window.localStorage.getItem('projectSchema') || '{}'
    );

    const { componentsMap: componentsMapArray = [], componentsTree = [] } = projectSchema;

    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    const libraryMap = {};
    const libraryAsset: Asset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });
    await new AssetLoader().load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema: componentsTree[0],
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || Object.keys(components).length === 0) {
    init();
    return <>loading...</>;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('lce-container'));
