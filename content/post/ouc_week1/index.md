---
title: "OUC Week1 CTF"
date: 2026-06-29T15:00:00+08:00
draft: false
tags: ["OUC"]
summary: "OUC Week1 CTF 解题记录"
---

# Misc

## 1.签到题
力竭了！

![image](images/image-20260629140629-2i76ip6.png)

## 2.ezBase64

`ZmxhZ3syOGI5MjE3Mi00ZmRmLTQ1ZWItYjRhNy02MWVlNTRjNTZjMDV9`

数字0-9，大小写字母都有，cyberchef一波
![image](images/image-20260629141011-6csytzy.png)

## 3.BaseCrack

```c
TEpXWFEyQzJHTjJHUVQyWExGM1ZTVjJHTkpNVkdNQlVMSktGS01LTUtSSkdXVEtVTk4yRTZWMjJOUk1YU01CVEpWVkZTTTJOR0pFVEdXVE5KWldVNFJDV0hFPT09PT09
```

base64-base32-base64，随波逐流三把梭也行
![image](images/image-20260629141304-mgcm6d5.png)

## 4.ROT13

随波逐流

![image](images/image-20260629141533-gl700fi.png)

## 5.Rail Fence

`fa{d9486b-509e-197d25lgbc4a-3145-719bc6e0}`

栅栏特征，随波逐流看下结果

![image](images/image-20260629142036-b09updt.png)

# Web

## 1.HTTP？GET？POST？
按要求传参
![image](images/image-20260629142221-f03fa70.png)

## 2.Robots.txt？
访问robots.txt，注意到flag.php

![image](images/image-20260629142447-omj3rsh.jpg)

访问flag.php，查看源代码得flag
![image](images/image-20260629142507-hsxy0sg.png)

## 3.HTTP Header

按照要求，在请求体里添加响应字段

xff代表客户端ip地址，referer代表当前请求来源网址，具体修改内容如下
![image](images/image-20260629143032-s97th19.png)

## 4.sql

看代码，post传入的两个参数直接拼接到sql语句执行，利用`' or 1`和`--+`绕过where条件，使得查询成功
![image](images/image-20260629143650-yncuqr5.png)

# Re

## 1.IDA Pro

64位，无壳

![image](images/image-20260629144034-dvpftqm.png)

![image](images/image-20260629145206-fewv4jw.png)

直接运行，flag显示不全，去ida看
![image](images/image-20260629145239-7q04wuy.png)

## 2.sign_in

![image](images/image-20260629145325-wc1n2h0.png)

文件名说是string，直接shift+f12查看字符串
![image](images/image-20260629145549-5hezfq3.png)

## 3.string

根据提示，shift+f12查看字符串
![image](images/image-20260629145810-esakvls.png)

## 4.xor

ida打开，跟进`check_flag`函数

![image](images/image-20260629145920-38gyl46.png)

根据check_flag逻辑，将enc逐个与0x12异或

![image](images/image-20260629145959-nlufq5o.png)

脚本如下

![image](images/image-20260629150046-evtxxp5.png)
