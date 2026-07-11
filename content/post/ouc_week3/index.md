---
title: "OUC Week3 CTF"
date: 2026-07-01T15:00:00+08:00
draft: false
tags: ["OUC"]
summary: "OUC Week3 CTF 解题记录"
---

## 1.逆向工程入门指北

ida查下字符串，搜索flag

![image](images/image-20260701095705-k39yxf9.png)

## 2.base

ida查看字符串，发现base64特征，拿去解一下就可以了

![image](images/image-20260701101533-5748cb4.png)

![image](images/image-20260701102129-tllzw3p.png)

## 3.upx

有壳，`upx -d`解一下

![image](images/image-20260701102214-jy8neqo.png)

![image](images/image-20260701102619-k33j0d9.png)

定位主要函数，反汇编看下逻辑

![image](images/image-20260701145054-knubg95.png)

```
要求输入的数据，经过异或处理后，要与v10数组相等
踩了一个坑是fgets会在数据末尾带一个换行符。这个换行符也是参与异或运算的
然后从末尾向前，每个元素与33和下一个元素进行异或运算
```

poc如下

![image](images/image-20260701145132-k3um0m0.png)

## 4.speed

下载附件，打开秒退

ida反编译看一下，挂1毫秒后，就关闭窗口了，在distroywindows这一行下个断点，再动调下

![image](images/image-20260701153014-w89ksvj.png)

![image](images/image-20260701153255-bv79863.png)

## 5.mazegame

查下字符串，看得出是个迷宫

![image](images/image-20260701164158-wok2y71.png)

定位关键函数看下，推出v7是横坐标，v8是纵坐标

![image](images/image-20260701164336-bakbzgx.png)

数字1代表墙。通关要求到达15行32列。

![image](images/image-20260701164400-knjzwns.png)

迷宫是56*56的，写个bfs得到移动序列，即flag

![image](images/image-20260705150533-9lfhe5l.png)

## 6.ezpy

题目附件是pyc，反编译回py

```python
#!/usr/bin/env python
# visit http://tool.lu/pyc/ for more information

def caesar_cipher_encrypt(text, shift):
    result = []
    for char in text:
        if char.isalpha():
            if char.islower():
                new_char = chr(((ord(char) - ord('a')) + shift) % 26 + ord('a'))
            elif char.isupper():
                new_char = chr(((ord(char) - ord('A')) + shift) % 26 + ord('A'))
            result.append(new_char)
            continue
        result.append(char)
    return ''.join(result)

user_input = input('please input your flag：')
a = 1
if a != 1:
    plaintext = user_input
    shift = 114514
    encrypted_text = caesar_cipher_encrypt(plaintext, shift)
    if encrypted_text == 'wyomdp{I0e_Ux0G_zim}':
        print('Correct!!!!')
```

这里相当于是凯撒，写一个逆向的脚本得flag

![image](images/image-20260705175247-csvjyue.png)

## 7.ezandroid

jadx打开，找到应用主入口

![image](images/image-20260705183215-53i61dc.png)

在base64Encode方法看到判断语句，比较对象是base64加密后的，拿去解密一下

![image](images/image-20260705190255-pw5qloa.png)

![image](images/image-20260705190331-bgn1h5n.png)

## 8.guess

主函数无法反编译

![image](images/image-20260705200631-bv7h5qi.png)

定位到`140001A5A`，发现三个跳转指令，其中jz与jnz已经保证了必跳转，下面这个call无用，nop掉后就可以反编译了

![image](images/image-20260705222820-c0cigc7.png)

反编译后，找到比较用户输入与随机数的判断语句

![image](images/image-20260706170557-vv2ns33.png)

给他改一下比较逻辑，jnz改成jz，这样用户输入与随机数不相等就输出flag

![image](images/image-20260706170650-1o8qvxc.png)

![image](images/image-20260706165936-t2gosea.png)

## 9.rusty_sudoku

![image](images/image-20260706175832-kfw6t1q.png)

查字符串，看到了数独表

![image](images/image-20260706180333-3w01orn.png)

在线网站解一下

![image](images/image-20260706180849-wy0849n.png)

![image](images/image-20260706180958-l6dj6tg.png)
