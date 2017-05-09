# CSS practice

## homework 1
There is a bug in this page. find this bug and solve it with CSS 2.1 reference.

## homework 2
`div#cont3`是一个没有设置宽度的浮动非替换元素，
该元素的宽度根据shrink-to-fit规范进行计算，
请根据[Floating, non-replace elements](https://www.w3.org/TR/CSS2/visudet.html#float-width)
的shrink-to-fit计算公式

```
If 'margin-left', or 'margin-right' are computed as 'auto', their used value is '0'.

If 'width' is computed as 'auto', the used value is the "shrink-to-fit" width.

Calculation of the shrink-to-fit width is similar to calculating the width of a table cell using the automatic table layout algorithm. Roughly: calculate the preferred width by formatting the content without breaking lines other than where explicit line breaks occur, and also calculate the preferred minimum width, e.g., by trying all possible line breaks. CSS 2.1 does not define the exact algorithm. Thirdly, find the available width: in this case, this is the width of the containing block minus the used values of 'margin-left', 'border-left-width', 'padding-left', 'padding-right', 'border-right-width', 'margin-right', and the widths of any relevant scroll bars.

Then the shrink-to-fit width is: 
```

**Computational formula**

`min(max(preferred minimum width, available width), preferred width).`

计算`#cont3`与其子元素`#sub31`, `sub#32`的宽度
