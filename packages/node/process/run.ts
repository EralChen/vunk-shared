import { spawn } from 'child_process'


/**
 * @description 使用这个方法, 调用脚本命令
 * @param script  脚本命令
 * @param cwd  运行脚本的目录
 * @returns 
 */
export const run = async (
  script: string, 
  cwd: string = process.cwd(),
) => { // 使用这个方法, 调用脚本命令
  return new Promise((resolve) => {
    // const 
    const [cmd, ...args] = script.split(' ')
    // 在node中使用子进程运行脚本
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    app.on('close', resolve)
  })
}


