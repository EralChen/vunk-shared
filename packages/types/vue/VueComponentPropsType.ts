import type { DefineComponent } from 'vue'

/**
 * @example
 * ```ts
 * import { ElForm } from 'element-plus'
   type FormProps = VueComponentPropsType<typeof ElForm>
 * ```
 */
export type VueComponentPropsType<
  T extends abstract new (...args: any) => any
> = Omit<
  InstanceType<T>['$props'], 
  keyof InstanceType<DefineComponent>['$props']
>


