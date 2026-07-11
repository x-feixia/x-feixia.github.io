---
title: "OUC Week2 CTF"
date: 2026-06-30T15:00:00+08:00
draft: false
tags: ["OUC"]
summary: "OUC Week2 CTF 解题记录"
---

# Misc

## 1.Misc入门指北

打开pdf，搜索`moectf` ，发现一行，应该是白色字体吧，复制出来

`moectf{We1c0m3_7o_tH3_w0R1d_0f_m1sc3111aN3ous!!}`

![image](images/image-20260629224046-nzmgwx5.png)

## 2.Rush

打开，看到gif图，有一帧是个二维码

![image](images/image-20260629224246-buq7p82.png)

用puzzleSolver的gif拆分

![image](images/image-20260629224503-xcsgr5w.png)

注意到二维码缺边角，本想补充一下，但是QR search可以直接提出flag

![image](images/image-20260629225131-14j6s5a.png)

后面去了解了一下，发现右下角的数据虽然丢失，但是可以通过纠错块（E开头的部分）补全

而正常扫码是用左上，左下，右上三个定位块，实际任意存在两个，软件就可以推算补全第三个定位块

![image](images/image-20260629225325-irow3f3.png)

## 3.ez_锟斤拷????

根据提示，搜了下"锟斤拷"，说是GBK与unicode转换时产生的问题。

![image](images/image-20260629232654-nyk52ub.png)

这里应该是utf-8格式的字节，被当作GBK解码了。所以来个GBK编码，再按照utf-8解码就可以了

![image](images/image-20260629234213-jsulc35.png)

## 4.ez_LSB

![image](images/image-20260630100340-56535z4.png)

lsb隐写吧，看下红色通道

![image](images/image-20260630100427-7iw264g.png)

直接拿去提交，不对。有0-9，大小写字母，再base64解一下

![image](images/image-20260630100721-rc6zpsp.png)

## 5.SSTV

搜索了一下，SSTV是满扫描电视，题目给的音频可以利用在线工具转为图片

`https://sstv-decoder.mathieurenaud.fr/`

![image](images/image-20260630230359-xpxzpuh.png)

## 6.捂住一只耳

根据提示，应该是单侧声道的隐写

![image](images/image-20260630103327-m2acuoy.png)

找个在线工具，提摩斯密码，解码

![image](images/image-20260630104112-jt5c9b3.png)

## 7.Enchantment

```
哇多么好的附魔啊

你把图片发了出去，但似乎附魔台上的文字有一些不对劲？
```

根据描述，找到上传图片的请求包，提取出这个图片

![image](images/image-20260630111015-2jo5a7m.png)

字符像是加密，搜索了下说是`银河字母加密`

![image](images/image-20260630111035-34ct3vj.png)

![image](images/image-20260630111318-peupu0x.png)

对照着解一下

```
the flag is below
now you have 
mastered enchanting
```

# web

## 1.Web入门指北

提到控制台，下面这堆经过了解，是js代码的一种形式，用最少的字符集表达完整的js语义。拿到控制台运行一下就行

![image](images/image-20260630134059-v3235la.png)

![image](images/image-20260630134220-x55r0gp.png)

## 2.Moe笑传之猜猜爆

看下代码，发现随机数是前端生成的，可以提前在控制台查看下这个值

![image](images/image-20260630144508-nfqu7nl.png)

![image](images/image-20260630144525-1e91u7j.png)

## 3.第一章 神秘的手镯

不让粘贴，禁用js

![image](images/image-20260630145342-vqo2ge1.png)

![image](images/image-20260630145416-volrw2p.png)

## 4.第一章 神秘的手镯_revenge

密码没有直接给，题目描述说有备份，访问`/wanyanzhou.txt.bak` 可以拿到密码。

还有一个条件是输入500遍，这里直接yakit抓包爆破

![image](images/image-20260630155248-u5w4lx8.png)

## 5.第二章 初识金曦玄轨

![image](images/image-20260630155803-isu6o2z.png)

根据提示，抓包，看到响应头指定了一个路径

![image](images/image-20260630155854-iu5rppl.png)

再抓包，在响应包的一个字段看到了flag

![image](images/image-20260630155927-2yve9fe.png)

## 6.第三章 问剑石！篡天改命！

根据题目要求，改一下get和post的参数

![image](images/image-20260630225013-1q7yz7o.png)

![image](images/image-20260630225041-lksh3ix.png)

## 7.第四章 金曦破禁与七绝傀儡阵

类似ouc靶场的那道web题目，没达到一个要求，给一部分base64后的flag。直接放最后一步吧，使用PUT方法

![image](images/image-20260630223510-fjpxom2.png)

![image](images/image-20260630223602-dagqtqy.png)

## 8.第五章 打上门来！

提示目录穿越，尝试退到根目录读flag

![image](images/image-20260630224031-xnnwu1z.png)

## 9.第六章 藏经禁制？玄机初探！

看一眼题目描述最下面，提示了数据库注入

![image](images/image-20260630162110-0hxvqo7.png)

到登录界面，万能密码登一下，登陆成功得到flag

![image](images/image-20260630162154-ssok1um.png)
