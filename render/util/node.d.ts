import { design } from '../../design/components/edit'

/**
 * 通过key查找到一个节点 返回的parentNode是他的父节点数据，可以递归查找到最顶层节点直到这个值为null
 * @param nodes 节点列表
 * @param  key 节点key
 */
export function querySelectByKey(
  nodes: design.Node[],
  key: string
): design.Node

/**
 * 查找到这个节点的原始数据
 * 使用querySelectByKey查找到的数据是经过处理的，当你需要原始值则使用这个函数查找
 * @param nodes 节点列表
 * @param  key 节点key
 */
export function querySelectByKeyOriginal(
  nodes: design.Node[],
  key: string
): design.Node

/**
 * 判断一个节点是不是另外一个节点的子节点
 * @param childKey 子节点key
 * @param key 要判断的节点key
 * @param nodes 节点列表
 */
export function isChildNode(childKey: string, key: string, nodes: design.Node[]): boolean

/**
 * 节点数据数据创建
 * @param nodeName 节点标识
 * @param attr 节点属性
 * @param child 子节点
 */
export function nodeCreate(nodeName: string, props?: object, child?: design.Node[]): design.Node

/**
 * 筛选节点数据，过滤以下划线_开头的数据和禁用列表的数据，筛选后的数据可以用于组件的属性绑定
 * @param props
 */
export function filterProps<T>(props: T): T
