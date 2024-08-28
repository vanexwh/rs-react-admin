export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// type 类型定义
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能 feature
				'fix', // 修复 bug
				'docs', // 文档注释
				'style', // 代码格式(不影响代码运行的变动)
				'refactor', // 重构(既不增加新功能，也不是修复bug)
				'perf', // 性能优化
				'test', // 增加测试
				'chore', // 构建过程或辅助工具的变动
				'revert', // 回退
				'build', // 打包
				'ci', // 持续集成修改
				'test', // 测试用例修改
			],
		],
		// subject 大小写不做校验
		// 自动部署的BUILD ROBOT的commit信息大写，以作区别
		'subject-case': [0],
		'must-add-document-url': [2, 'always'], // 加入自定义规则
		'body-max-line-length': [2, 'always', 200], // body最大内容行数
		'header-max-length': [2, 'always', 200], // header 最大长度
	},
	plugins: [
		{
			rules: {
				'must-add-document-url': ({ type, body }) => {
					const ALIYUN_DOCUMENT_PREFIX = 'https://devops.aliyun.com';

					// 排除的类型
					const excludeTypes = ['chore', 'refactor', 'style', 'test'];
					if (excludeTypes.includes(type)) {
						return [true];
					}

					return [body && body.includes(ALIYUN_DOCUMENT_PREFIX), `提交的内容中必须包含有效相关文档地址`];
				},
			},
		},
	],
};
