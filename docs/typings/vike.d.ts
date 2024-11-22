
/// <reference types="vike-vue/dist/+config" />

import { ApiReturnType } from '@vunk/core'
import { rCrowdinFilesAsReflect } from '../renderer/crowdin'
import { CrowdinFileLang } from '#/shared';


declare global {
  namespace Vike {
    interface PageContext {
      crowdin: ApiReturnType<typeof rCrowdinFilesAsReflect>
      lang: CrowdinFileLang
    }
  }

  namespace VikePackages {
    interface ConfigVikeVue {
        /**
         * @deprecated
         * use `pageContext.lang` instead
         */
        lang?: string;
  
    }
  }
}


export {}
