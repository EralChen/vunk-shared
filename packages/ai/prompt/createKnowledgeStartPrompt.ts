/**
 * @description
  我想学习【X】。请按照二八法则（80-20原则）制定一个全面的学习计划，重点关注能让我开始构建项目的20%核心概念。请将计划按周安排，总计【Y】周，每周涵盖特定的学习主题。

  在完成这【Y】周的核心学习后，请推荐5个难度递增的项目（从入门到进阶），帮助我应用和拓展【X】的知识。对于每个项目，请提供简要描述并列出它将帮助强化的关键概念。

  请确保计划详细到足以让初学者跟随，同时也要有足够的挑战性来培养独立思考和解决问题的能力。
 */

export function createKnowledgeStartPrompt (options: {
  subject: string
  weeks: number
}) {
  return [
    `我想学习${options.subject}。请按照二八法则（80-20原则）制定一个全面的学习计划，重点关注能让我开始构建项目的20%核心概念。请将计划按周安排，总计${options.weeks}周，每周涵盖特定的学习主题。`,
    `在完成这${options.weeks}周的核心学习后，请推荐5个难度递增的项目（从入门到进阶），帮助我应用和拓展${options.subject}的知识。对于每个项目，请提供简要描述并列出它将帮助强化的关键概念。`,
    '请确保计划详细到足以让初学者跟随，同时也要有足够的挑战性来培养独立思考和解决问题的能力。',
  ].join('\n')
}
