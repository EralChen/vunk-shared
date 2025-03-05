/**
 * @description
  我正在学习【X】中的【Y】。请提供：

  1. 简明扼要地解释【Y】，包括其用途和常见使用场景。

  2. 一个演示【Y】的简单代码示例。

  3. 初学者关于【Y】常见的三个错误或误解，以及如何避免它们。

  4. 两个【Y】特别有用的实际应用场景或用例。

  5. 三个难度递进的练习题，帮助我练习使用【Y】。请只提供题目描述，不要提供解答。

  在提供以上信息后，请向我提出一个关于【Y】的发人深省的问题，引导我更深入地思考它的应用或影响。
 */
export function createKnowledgeLearnPrompt (options: {
  subject: string
  topic: string
}) {
  return [
    `我正在学习${options.subject}中的${options.topic}。请提供：`,
    `1. 简明扼要地解释${options.topic}，包括其用途和常见使用场景。`,
    `2. 一个演示${options.topic}的简单代码示例。`,
    `3. 初学者关于${options.topic}常见的三个错误或误解，以及如何避免它们。`,
    `4. 两个${options.topic}特别有用的实际应用场景或用例。`,
    `5. 三个难度递进的练习题，帮助我练习使用${options.topic}。请只提供题目描述，不要提供解答。`,
    `在提供以上信息后，请向我提出一个关于${options.topic}的发人深省的问题，引导我更深入地思考它的应用或影响。`,
  ].join('\n')
}
