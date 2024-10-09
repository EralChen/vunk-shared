import { user32dll } from './user32dll'

/**
 * @link
 * https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumwindows
 */
export const EnumWindows = user32dll.func('EnumWindows', 'bool', ['lpEnumFunc*', 'int'])

