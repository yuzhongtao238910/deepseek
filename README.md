## 常用的tailwindcss的类名的含义
- h-full: 设置高度为父级的100%
- h-screen: 设置高度为100vh
- text-base: font-size: 1rem; /* 16px */ line-height: 1.5rem; /* 24px */
- text-2xl: font-size: 1.5rem; /* 24px */ line-height: 2rem; /* 32px */
- text-sm: font-size: 0.875rem; /* 14px */ line-height: 1.25rem; /* 20px */
- gap-3: 0.75rem; /* 12px */
- gap-4: 1rem; /* 16px */


## flex布局的1个重要知识点
- 在默认的 flex-direction: row（横向布局）中：
    - 主轴是横向 → 控制子元素宽度；
    - 交叉轴是纵向 → 控制子元素高度；
    - 如果父容器有明确高度，那么：子元素会默认在交叉轴（垂直方向）上 继承这个高度，除非你显式设置了其他高度。

- 如果父元素已经使用了flex布局，并且父元素进行了相对定位，那么子元素即使设置了绝对定位，还是会受到flex布局的影响的
```html
// 如果下图所示，此时.demo1子元素也是会居中的
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .app1 {
            height: 100vh;
            display: flex;
            align-items: stretch;
        }
        .child1 {
            flex-shrink: 1;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        .demo1 {
            background-color: gray;
            position: absolute;
            bottom: 12px;
        }
    </style>
</head>
<body>
    <div>
        <div class="app1">
            <div class="child1">
                <div class="demo1">111</div>
            </div>
        </div>
    </div>
</body>
</html>
```


## tailwindcss之中的媒体查询的值
- 'sm': '640px' => @media (min-width: 640px) { ... }
- 'md': '768px' => @media (min-width: 768px) { ... }
- 'lg': '1024px' => @media (min-width: 1024px) { ... }
- 'xl': '1280px' => @media (min-width: 1280px) { ... }
- '2xl': '1536px' => @media (min-width: 1536px) { ... }

- @media not all and (min-width: 640px)：这个语法用于排除 宽度大于等于 640px 的设备，实际上与 @media (max-width: 640px) 的效果是等效的。
- max-sm @media not all and (min-width: 640px) { ... }
- max-md @media not all and (min-width: 768px) { ... }
- max-lg @media not all and (min-width: 1024px) { ... }
- max-xl @media not all and (min-width: 1280px) { ... }
- max-2xl @media not all and (min-width: 1536px) { ... }


## group 
- group：加在父元素上，让它具备“组”功能。group-hover:text-black：加在子元素上，意思是：当父元素被 hover 时，子元素变成黑色文字
```html
<div className="group p-4 hover:bg-gray-100">
    <p className="text-gray-500 group-hover:text-black">我是子元素</p>
</div>
```
- hover	group-hover:	父元素被悬停时
- focus	group-focus:	父元素获得焦点时
- active group-active:	父元素被点击时


## max-w-2xl	
- max-w-2xl: max-width: 42rem; /* 672px */
