import { e as requireReact, g as getDefaultExportFromCjs } from './index-CPQPU9RC.js';

var compilerRuntime$2 = {exports: {}};

var reactCompilerRuntime_production = {};

/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactCompilerRuntime_production;

function requireReactCompilerRuntime_production () {
	if (hasRequiredReactCompilerRuntime_production) return reactCompilerRuntime_production;
	hasRequiredReactCompilerRuntime_production = 1;
	"use strict";
	var ReactSharedInternals =
	  requireReact().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	reactCompilerRuntime_production.c = function (size) {
	  return ReactSharedInternals.H.useMemoCache(size);
	};
	return reactCompilerRuntime_production;
}

var compilerRuntime$1 = compilerRuntime$2.exports;

var hasRequiredCompilerRuntime;

function requireCompilerRuntime () {
	if (hasRequiredCompilerRuntime) return compilerRuntime$2.exports;
	hasRequiredCompilerRuntime = 1;
	"use strict";
	if (true) {
	  compilerRuntime$2.exports = requireReactCompilerRuntime_production();
	} else {
	  module.exports = require("./cjs/react-compiler-runtime.development.js");
	}
	return compilerRuntime$2.exports;
}

var compilerRuntimeExports = requireCompilerRuntime();
const compilerRuntime = /*@__PURE__*/getDefaultExportFromCjs(compilerRuntimeExports);

export { compilerRuntimeExports as c };
//# sourceMappingURL=compiler-runtime-CCnkACVM.js.map
