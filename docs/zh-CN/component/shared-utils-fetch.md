--- 
title: UtilsFetch 
lang: zh-CN
---

# UtilsFetch

UtilsFetch

## 需求场景

原生的 `fetch` 对于 rest 请求来说，相当繁琐；

且项目中 rest 请求，大多需要做一层抽象（ baseUrl, 请求拦截 + token 等）；


## 基础用法

:::demo 
shared-utils-fetch/basic
>>>tabs
[shared-utils-fetch/api, shared-utils-fetch/request]
>>>
:::

## UtilsFetch 其他