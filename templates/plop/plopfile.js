/**
 *	Plop - CLI Config
 */

module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  /** Helper Section */
  /** @usage {{#if (isEquals operand1 operand2)}}...{{/if}} */
  plop.setHelper('isEquals', (/** @type {any} */ arg1, /** @type {any} */ arg2) => arg1 === arg2);

  const LICENSE = 'Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved';
  plop.setPartial('license', LICENSE);

  /** Generator Section *******************************************/
  const PROJECT_ROOT = '../..';
  const SRC_DIRECTORY = `${PROJECT_ROOT}/src`;

  plop.setGenerator('api', {
    description: 'Auto generate centralize graphql api service module in /src/services/api',
    prompts: [{ type: 'input', name: 'name', message: 'Graphql service name' }],
    actions: [
      {
        type: 'add',
        templateFile: './api/fragment.graphql.hbs',
        path: `${SRC_DIRECTORY}/services/api/{{kebabCase name}}/fragment.graphql`,
      },
      {
        type: 'add',
        templateFile: './api/schema.graphql.hbs',
        path: `${SRC_DIRECTORY}/services/api/{{kebabCase name}}/schema.graphql`,
      },
    ],
  });

  plop.setGenerator('component', {
    description: 'Auto generate component in /src/components',
    prompts: [
      { type: 'list', name: 'type', message: 'Choose component type', choices: ['MINIMAL', 'FULL'] },
      { type: 'input', name: 'name', message: 'Component name' },
      { type: 'input', name: 'scope', message: 'Component scope', default: 'common' },
      { type: 'confirm', name: 'withStyle', message: 'Using local style ?', default: true },
      { type: 'confirm', name: 'withService', message: 'Using local api service ?', default: true },
    ],
    actions: (answers) => {
      const _createIndex = {
        type: 'add',
        templateFile: './component/entity/index.tsx.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/index.tsx`,
      };

      const _createContainer = {
        type: 'add',
        templateFile: './component/entity/name.container.tsx.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.container.tsx`,
      };

      const _createContent = {
        type: 'add',
        templateFile: './component/entity/name.content.tsx.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.content.tsx`,
      };

      const _createMain = {
        type: 'add',
        templateFile: './component/entity/name.container.tsx.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.main.tsx`,
      };

      const _createModel = {
        type: 'add',
        templateFile: './component/entity/name.model.tsx.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.model.tsx`,
      };

      const _createStyle = {
        type: 'add',
        templateFile: './component/entity/name.module.css.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.module.css`,
      };

      const _createService = {
        type: 'add',
        templateFile: './component/entity/name.service.graphql.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/{{kebabCase name}}.service.graphql`,
      };

      const _createReadme = {
        type: 'add',
        templateFile: './component/entity/README.md.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/{{kebabCase name}}/README.md`,
      };

      const _createBarrel = {
        type: 'add',
        skipIfExists: true,
        templateFile: './component/index.tsx.backup.hbs',
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/index.tsx`,
      };

      const _appendExporter = {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/components/{{kebabCase scope}}/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      };

      let _actions = [];
      _actions.push(_createIndex);
      if (answers && answers.type === 'FULL') {
        _actions.push(_createContainer);
        _actions.push(_createContent);
      } else {
        _actions.push(_createMain);
      }
      _actions.push(_createModel);
      if (answers && answers.withStyle) {
        _actions.push(_createStyle);
      }
      if (answers && answers.withService) {
        _actions.push(_createService);
      }
      _actions.push(_createReadme);
      _actions.push(_createBarrel);
      _actions.push(_appendExporter);

      return _actions;
    },
  });

  plop.setGenerator('feature', {
    description: 'Auto generate feature in /src/features',
    prompts: [
      { type: 'list', name: 'category', message: 'Select feature category', choices: ['BLANK', 'CMS'] },
      {
        type: 'list',
        name: 'type',
        message: 'Select feature type',
        choices: ['LIST', 'CRUD'],
        when: (answers) => answers.category === 'CMS',
      },
      { type: 'input', name: 'name', message: 'Feature name' },
      // { type: 'confirm', name: 'withStyle', message: 'Using local style ?', default: true },
      // { type: 'confirm', name: 'withService', message: 'Using local api service ?', default: true },
    ],
    actions: (answers) => {
      
      const baseFeaturePath = `${SRC_DIRECTORY}/pages/{{kebabCase name}}`;
      const _createIndex = {
        type: 'add',
        templateFile: './feature/entity/name.container.tsx.hbs',
        path: `${SRC_DIRECTORY}/pages/{{kebabCase name}}/index.tsx`,
      };

      const _createModel = {
        type: 'add',
        templateFile: './feature/entity/name.model.tsx.hbs',
        path: `${SRC_DIRECTORY}/pages/{{kebabCase name}}/index.model.ts`,
      };

      const subfolders = ['add', 'view', 'edit'];
      let _actions = [];
      if(answers.type == 'CRUD'){
        subfolders.forEach((folder)=>{
          const folderPath = `${baseFeaturePath}/${folder}`;
          
          // let _createFolderModel = {
          //   type: 'add',
          //   path: `${folderPath}/[id].tsx`,
          //   templateFile: `./feature/entity/name.edit-view.container.tsx.hbs`,
          // };
          if(folder == "add"){
              _createFolder = {
              type: 'add',
              path: `${folderPath}/index.tsx`,
              templateFile: './feature/entity/name.add.container.tsx.hbs',
            };
              _createFolderModel = {
              type: 'add',
              path: `${folderPath}/index.model.ts`,
              templateFile: `./feature/entity/name.add.model.tsx.hbs`,
            };
            _actions.push(_createFolder);
            _actions.push(_createFolderModel)
          }
          else{
            let _createFolder = {
              type: 'add',
              path: `${folderPath}/[id].tsx`,
              templateFile: './feature/entity/name.edit-view.container.tsx.hbs',
            };
            _actions.push(_createFolder);
          }
         ;
        });
      }
      

      // const pagePath = `${SRC_DIRECTORY}/pages/{{kebabCase name}}`;
      // const _pages = [
      //   {
      //     type: 'add',
      //     templateFile: './page/entity/index.tsx.backup.hbs',
      //     path: `${pagePath}/index.tsx.backup`,
      //   },
      // ];

      // let _actions = [];
   
      

      // _pages.map((p) => {
      //   _actions.push(p);
      // });
      _actions.push(_createIndex);
      _actions.push(_createModel);

      return _actions;
    },
  });

  plop.setGenerator('function', {
    description: 'Auto generate utility function in /src/utils/functions',
    prompts: [{ type: 'input', name: 'name', message: 'Function name' }],
    actions: [
      {
        type: 'add',
        templateFile: './function/entity/index.tsx.backup.hbs',
        path: `${SRC_DIRECTORY}/utils/functions/{{kebabCase name}}/index.tsx`,
      },
      {
        type: 'add',
        templateFile: './function/entity/name.main.tsx.hbs',
        path: `${SRC_DIRECTORY}/utils/functions/{{kebabCase name}}/{{kebabCase name}}.main.tsx`,
      },
      {
        type: 'add',
        templateFile: './function/entity/name.model.tsx.hbs',
        path: `${SRC_DIRECTORY}/utils/functions/{{kebabCase name}}/{{kebabCase name}}.model.tsx`,
      },
      {
        type: 'add',
        skipIfExists: true,
        path: `${SRC_DIRECTORY}/utils/functions/index.tsx`,
        templateFile: './function/index.tsx.backup.hbs',
      },
      {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/utils/functions/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      },
    ],
  });

  plop.setGenerator('hook', {
    description: 'Auto generate custom hook in /src/hooks',
    prompts: [{ type: 'input', name: 'name', message: 'Hook name' }],
    actions: [
      {
        type: 'add',
        templateFile: './hook/entity/index.tsx.backup.hbs',
        path: `${SRC_DIRECTORY}/hooks/{{kebabCase name}}/index.tsx`,
      },
      {
        type: 'add',
        templateFile: './hook/entity/name.main.tsx.hbs',
        path: `${SRC_DIRECTORY}/hooks/{{kebabCase name}}/{{kebabCase name}}.main.tsx`,
      },
      {
        type: 'add',
        templateFile: './hook/entity/name.model.tsx.hbs',
        path: `${SRC_DIRECTORY}/hooks/{{kebabCase name}}/{{kebabCase name}}.model.tsx`,
      },
      {
        type: 'add',
        skipIfExists: true,
        path: `${SRC_DIRECTORY}/hooks/index.tsx`,
        templateFile: './hook/index.tsx.backup.hbs',
      },
      {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/hooks/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      },
    ],
  });

  plop.setGenerator('store', {
    description: 'Auto generate global state manager in /src/stores',
    prompts: [
      { type: 'input', name: 'entity', message: 'Entity name' },
      { type: 'input', name: 'name', message: 'Store name' },
      { type: 'confirm', name: 'withSelector', message: 'Using selector?', default: false },
    ],
    actions: (answer) => {
      const _path = `${SRC_DIRECTORY}/stores/${answer.entity}`;
      const _createIndex = {
        type: 'add',
        templateFile: './store/entity/atom/index.tsx.backup.hbs',
        path: `${_path}/{{kebabCase name}}/index.tsx`,
      };

      const _createAtom = {
        type: 'add',
        templateFile: './store/entity/atom/name.atom.tsx.hbs',
        path: `${_path}/{{kebabCase name}}/{{kebabCase name}}.atom.tsx`,
      };

      const _createEffect = {
        type: 'add',
        templateFile: './store/entity/atom/name.effects.tsx.hbs',
        path: `${_path}/{{kebabCase name}}/{{kebabCase name}}.effects.tsx`,
      };

      const _createModel = {
        type: 'add',
        templateFile: './store/entity/atom/name.model.tsx.hbs',
        path: `${_path}/{{kebabCase name}}/{{kebabCase name}}.model.tsx`,
      };

      const _createSelector = {
        type: 'add',
        skipIfExists: true,
        templateFile: './store/entity/name.selector.tsx.hbs',
        path: `${_path}/{{kebabCase entity}}.selector.tsx`,
      };

      const _createLocalBarrel = {
        type: 'add',
        skipIfExists: true,
        path: `${_path}/index.tsx`,
        templateFile: './store/entity/index.tsx.backup.hbs',
      };

      const _appendLocalExporter = {
        type: 'append',
        unique: true,
        path: `${_path}/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      };

      const _createRootBarrel = {
        type: 'add',
        skipIfExists: true,
        path: `${SRC_DIRECTORY}/stores/index.tsx`,
        templateFile: './store/index.tsx.backup.hbs',
      };

      const _appendRootExporter = {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/stores/index.tsx`,
        template: `export * from './{{kebabCase entity}}';`,
      };

      const _appendInstanceKeyToStorageImport = {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/services/web-session-storage/web-session-storage.model.tsx`,
        pattern: '/** RecoilInstanceKeys */',
        template: `  {{pascalCase name}}Store,`,
      };

      const _appendItemKeyToSessionStorage = {
        type: 'append',
        path: `${SRC_DIRECTORY}/services/web-session-storage/web-session-storage.model.tsx`,
        pattern: '/** AppendRecoilInstances */',
        template: `| {{pascalCase name}}Store.InstanceKey\r\n`,
      };

      let _actions = [];
      _actions.push(_createIndex);
      _actions.push(_createAtom);
      _actions.push(_createEffect);
      _actions.push(_createModel);
      if (answer && answer.withSelector) {
        _actions.push(_createSelector);
      }
      _actions.push(_createLocalBarrel);
      _actions.push(_appendLocalExporter);
      _actions.push(_createRootBarrel);
      _actions.push(_appendRootExporter);
      _actions.push(_appendInstanceKeyToStorageImport);
      _actions.push(_appendItemKeyToSessionStorage);

      return _actions;
    },
  });

  plop.setGenerator('variable', {
    description: 'Auto generate utility variable in /src/utils/variables',
    prompts: [{ type: 'input', name: 'name', message: 'Function name' }],
    actions: [
      {
        type: 'add',
        templateFile: './variable/entity/index.tsx.backup.hbs',
        path: `${SRC_DIRECTORY}/utils/variables/{{kebabCase name}}/index.tsx`,
      },
      {
        type: 'add',
        templateFile: './variable/entity/name.main.tsx.hbs',
        path: `${SRC_DIRECTORY}/utils/variables/{{kebabCase name}}/{{kebabCase name}}.main.tsx`,
      },
      {
        type: 'add',
        skipIfExists: true,
        path: `${SRC_DIRECTORY}/utils/variables/index.tsx`,
        templateFile: './variable/index.tsx.backup.hbs',
      },
      {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/utils/variables/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      },
    ],
  });

  plop.setGenerator('module', {
    description: 'Auto generate Module',
    prompts: [
      //{ type: 'list', name: 'category', message: 'Select feature category', choices: [ 'BLANK', 'LOGIN', 'CMS' ] },
      //{ type: 'list', name: 'type', message: 'Select feature type', choices: [ 'LIST', 'CRUD' ], when: (answers) => answers.category === 'CMS' },
      { type: 'input', name: 'name', message: 'Feature name' },
    ],
    actions: (answers) => {
      const modulePath = `./module/feature/entity`;
      const featurePath = `${SRC_DIRECTORY}/features/{{kebabCase name}}`;

      const _createFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/create/index.tsx.hbs`,
          path: `${featurePath}/create/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.container.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.container.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.content.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.content.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.model.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.model.tsx`,
        },
      ];

      const _editFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/edit/index.tsx.hbs`,
          path: `${featurePath}/edit/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/edit/name.container.tsx.hbs`,
          path: `${featurePath}/edit/{{kebabCase name}}-edit.container.tsx`,
        },
      ];

      const _listFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/list/index.tsx.hbs`,
          path: `${featurePath}/list/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/list/name.container.tsx.hbs`,
          path: `${featurePath}/list/{{kebabCase name}}-list.container.tsx`,
        },
        /*
        {
          type: 'add',
          templateFile: `${ modulePath }/list/name.content.tsx.hbs`,
          path: `${ featurePath }/list/{{kebabCase name}}-list.content.tsx`
        },
        */
        {
          type: 'add',
          templateFile: `${modulePath}/list/name.model.tsx.hbs`,
          path: `${featurePath}/list/{{kebabCase name}}-list.model.tsx`,
        },
      ];

      const _createBarrel = {
        type: 'add',
        skipIfExists: true,
        templateFile: `${modulePath}/index.tsx.hbs`,
        path: `${featurePath}/index.tsx`,
      };

      const _appendExporter = {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/features/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      };

      const _features = [..._createFeatures, ..._editFeatures, ..._listFeatures, _createBarrel, _appendExporter];

      const pagePath = `${SRC_DIRECTORY}/pages/{{kebabCase name}}`;
      const _pages = [
        {
          type: 'add',
          templateFile: './page/entity/index.tsx.backup.hbs',
          path: `${pagePath}/index.tsx`,
        },
        {
          type: 'add',
          templateFile: './page/entity/index-create.tsx.hbs',
          path: `${pagePath}/create/index.tsx`,
        },
        {
          type: 'add',
          templateFile: './page/entity/index-edit.tsx.hbs',
          path: `${pagePath}/[id]/index.tsx`,
        },
      ];

      let _actions = [];
      _features.map((f) => {
        _actions.push(f);
      });
      _pages.map((p) => {
        _actions.push(p);
      });

      return _actions;
    },
  });

  plop.setGenerator('moduleCustomV2', {
    description: 'Auto generate Module',
    prompts: [
      //{ type: 'list', name: 'category', message: 'Select feature category', choices: [ 'BLANK', 'LOGIN', 'CMS' ] },
      //{ type: 'list', name: 'type', message: 'Select feature type', choices: [ 'LIST', 'CRUD' ], when: (answers) => answers.category === 'CMS' },
      { type: 'input', name: 'name', message: 'Feature name' },
    ],
    actions: (answers) => {
      const modulePath = `./module/feature/entity`;
      const featurePath = `${SRC_DIRECTORY}/features/{{kebabCase name}}`;
      const _createFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/create/index.tsx.hbs`,
          path: `${featurePath}/create/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.container.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.container.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.content.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.content.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/create/name.model.tsx.hbs`,
          path: `${featurePath}/create/{{kebabCase name}}-create.model.tsx`,
        },
      ];

      const _editFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/edit/index.tsx.hbs`,
          path: `${featurePath}/edit/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/edit/name.container.tsx.hbs`,
          path: `${featurePath}/edit/{{kebabCase name}}-edit.container.tsx`,
        },
      ];

      const _listFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/list/index.tsx.hbs`,
          path: `${featurePath}/list/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/list/name.container.tsx.hbs`,
          path: `${featurePath}/list/{{kebabCase name}}-list.container.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/list/name.model.tsx.hbs`,
          path: `${featurePath}/list/{{kebabCase name}}-list.model.tsx`,
        },
      ];

      const _viewFeatures = [
        {
          type: 'add',
          templateFile: `${modulePath}/view/index.tsx.hbs`,
          path: `${featurePath}/view/index.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/view/name.container.tsx.hbs`,
          path: `${featurePath}/view/{{kebabCase name}}-view.container.tsx`,
        },
        {
          type: 'add',
          templateFile: `${modulePath}/view/name.model.tsx.hbs`,
          path: `${featurePath}/view/{{kebabCase name}}-view.model.tsx`,
        },
      ];

      const _createBarrel = {
        type: 'add',
        skipIfExists: true,
        templateFile: `${modulePath}/index.tsx.hbs`,
        path: `${featurePath}/index.tsx`,
      };

      const _appendExporter = {
        type: 'append',
        unique: true,
        path: `${SRC_DIRECTORY}/features/index.tsx`,
        template: `export * from './{{kebabCase name}}';`,
      };

      const _features = [..._createFeatures, ..._editFeatures, ..._listFeatures, ..._viewFeatures, _createBarrel, _appendExporter];
      const pagePath = `${SRC_DIRECTORY}/pages/{{kebabCase name}}`;
      const _pages = [
        {
          type: 'add',
          templateFile: `./page/entity/index.tsx.hbs`,
          path: `${pagePath}/index.tsx`,
        },
        {
          type: 'add',
          templateFile: './page/entity/index-create.tsx.hbs',
          path: `${pagePath}/create/index.tsx`,
        },
        {
          type: 'add',
          templateFile: './page/entity/index-edit.tsx.hbs',
          path: `${pagePath}/[id]/index.tsx`,
        },
        {
          type: 'add',
          templateFile: './page/entity/index-view.tsx.hbs',
          path: `${pagePath}/view/[id]/index.tsx`,
        },
      ];

      let _actions = [];
      _features.map((f) => {
        _actions.push(f);
      });
      _pages.map((p) => {
        _actions.push(p);
      });

      return _actions;
    },
  });
};
