import Inject from '@alilc/lowcode-plugin-inject';
import { init, plugins, project } from '@alilc/lowcode-engine';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import DataSource from '@alilc/lowcode-plugin-datasource-pane';
// import { setupHostEnvironment } from '@knxcloud/lowcode-utils';
import CodeEditor from '@knxcloud/lowcode-plugin-vue-code-editor';
import RegistryPlugin from './plugins/registry';
import InitPlugin from './plugins/init';
import SetterPlugin from './plugins/setter';
import Actions from './plugins/actions';
import './editor.less';

(async () => {
  const preference = new Map();

  preference.set('DataSourcePane', {
    importPlugins: [],
    dataSourceTypes: [
      {
        type: 'fetch',
      },
    ],
  });

  await plugins.register(Inject);
  await plugins.register(RegistryPlugin);
  await plugins.register(UndoRedoPlugin);
  await plugins.register(SchemaPlugin);
  await plugins.register(DataSource);
  await plugins.register(SetterPlugin);
  await plugins.register(InitPlugin);
  await plugins.register(CodeEditor);
  await plugins.register(Actions);

  // setupHostEnvironment(project, '/js/vue.runtime.global.js');

  await init(
    document.getElementById('lce-container')!,
    {
      enableCondition: true,
      enableCanvasLock: true,
      supportVariableGlobally: true,
      simulatorUrl: [
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
      ],
    },
    preference
  );
})();
