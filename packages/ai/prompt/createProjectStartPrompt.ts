/**
 * @description    我准备开始制作【X】项目，这个项目涉及【Y】。我目前在【Z】方面的水平是【入门/中级/高级】。请提供：

    1. 这个项目应该具备的主要组件或功能的高层次概述。

    2. 建议的项目结构，包括需要创建的主要文件或模块。

    3. 在构建这个项目时可能遇到的三个关键挑战，以及克服这些挑战的总体策略（不需要具体的代码解决方案）。

    4. 在完成基本功能后，可以尝试实现的两个进阶目标，以提升项目的复杂度。

    5. 这个项目将帮助我强化或学习的三个【Z】相关的重要概念或技能。

    请以引导思考的方式来回答，而不是提供明确的解决方案。我希望在实现细节方面受到挑战，自己去找出解决方法。
 * @param options
 * @returns string
 */
export function createProjectStartPrompt (options: {
  projectName: string
  keywords: string[]
  userSkills: {
    skill: string
    level: '入门' | '中级' | '高级'
  }[]
}) {
  return [
    `我准备开始制作${options.projectName}项目，这个项目涉及${options.keywords.join('、')}。我目前在${
      options.userSkills
        .map(skill => `${skill.skill}方面的水平是${skill.level}`)
        .join('、')
    }。请提供：`,
    '1. 这个项目应该具备的主要组件或功能的高层次概述。',
    '2. 建议的项目结构，包括需要创建的主要文件或模块。',
    '3. 在构建这个项目时可能遇到的三个关键挑战，以及克服这些挑战的总体策略（不需要具体的代码解决方案）。',
    '4. 在完成基本功能后，可以尝试实现的两个进阶目标，以提升项目的复杂度。',
    `5. 这个项目将帮助我强化或学习的三个${
      options.userSkills.map(skill => skill.skill).join('、')
    }相关的重要概念或技能。`,
  ].join('\n')
}
