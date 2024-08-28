import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

// 查看配置文件
//DEBUG=rsbuild pnpm dev
//DEBUG=rsbuild pnpm build
// 开启 Rsdoctor 诊断打包
//RSDOCTOR=true pnpm build

export default defineConfig({
	plugins: [pluginReact(), pluginBabel(), pluginSvgr()],
	html: {
		title: 'rsbuild',
		favicon: '',
		meta: {
			description: 'rsbuild',
		},
	},
	source: {
		entry: {
			index: './src/main.tsx',
		},
	},
	server: {
		port: 9077,
	},
	dev: {
		// 监听静态资源：图片/文件发生更新时，reload page
		watchFiles: {
			paths: ['./src/static/*', './public/*'],
			type: 'reload-page',
		},
	},
	output: {
		polyfill: 'usage',
	},
	performance: {
		// 使用了babel插件，rsbuild除了默认使用swc转译，还会使用babel，这里开启编译缓存，提升构建速度
		// 打包生产环境时建议关闭缓存
		buildCache: process.env.NODE_ENV === 'development' ? true : false,
		// 生产环境时移除console log/warn
		removeConsole: process.env.NODE_ENV === 'development' ? false : ['log', 'warn'],
		chunkSplit: {
			strategy: 'split-by-experience',
		},
		profile: true,
	},
	tools: {
		rspack(config, { appendPlugins }) {
			// 仅在 RSDOCTOR 为 true 时注册插件，因为插件会增加构建耗时
			if (process.env.RSDOCTOR) {
				appendPlugins(
					new RsdoctorRspackPlugin({
						// 插件选项
					}),
				);
			}
		},
	},
});
