function getStyle(element) {
    if (!element.style) {
        element.style = {};
    }

    for(let prop in element.computedStyle) {
        let p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}
function layout(element) {
    if (!element.computedStyle) {
        return;
    }
    let elementStyle = getStyle(element);

    if(elementStyle.display !== "flex") {
        return;
    }
    let items = element.children.filter(e => e.type === 'element');

    items.sort(function(a,b) {
        return (a.order || 0) - (b.order || 0);
    })
    let style = elementStyle;

    ['width','height'].forEach(size => {
        if (style[size] === "auto" || style[size] === '') {
            style[size] = null;
        }
    })

    if (!style['flex-direction'] || style['flex-direction'] === 'auto') {
        style['flex-direction'] = 'row';
      }

      if (!style['align-items'] || style['align-items'] === 'auto') {
        style['align-items'] = 'stretch';
      }

      if (!style['justify-content'] || style['justify-content'] === 'auto') {
        style['justify-content'] = 'flex-start';
      }

      if (!style['flex-wrap'] || style['flex-wrap'] === 'auto') {
        style['flex-wrap'] = 'nowrap';
      }

      if (!style['align-content'] || style['align-content'] === 'auto') {
        style['align-content'] = 'stretch';
      }
      
      let mainSize,mainStart,mainEnd,mainSign,mainBase,
      crossSize,crossStart,crossEnd,crossSign,crossBase;

      if (style['flex-direction'] === "row") {
          mainSize = 'width';
          mainStart = 'left';
          mainEnd = 'right';
          mainSign = +1;
          mainBase = 0;

          crossSize = 'height';
          crossStart ='top';
          crossEnd = 'bottom';
      }
      if (style['flex-direction'] === "row-reverse") {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart ='top';
        crossEnd = 'bottom';
    }
    if (style['flex-direction'] === "column") {
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart ='left';
        crossEnd = 'right';
    }
    if (style['flex-direction'] === "column-reverse") {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart ='left';
        crossEnd = 'right';
    }
    if (style['flex-wrap'] === "wrap-reverse") {
          var tmp = crossStart;
          crossStart = crossEnd;
          crossEnd = tmp;
          crossSign = -1;
    } else {
        crossBase = 0;
        crossSign = 1;
    }
    //分行
    var isAutoMainSize = false;
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0;
        for (let i=0; i<items.length;i++) {
            let item = items[i];
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
            isAutoMainSize = true;
        }

        let flexLine = [];
        let flexLines = [flexLine];

        let mainSpace = elementStyle[mainSize];
        let crossSpace = 0;

        for(let i=0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            if (itemStyle[mainSize] === null) {
                itemStyle[mainSize] = 0;
            }
            if (itemStyle.flex) {
                flexLine.push(item);
            } else if (style["flex-wrap"] === 'nowrap' && isAutoMainSize) {
                mainSpace -= itemStyle[mainSize];
                if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                    crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
                }
                flexLine.push(item);
            } else {
                if (itemStyle[mainSize] > style[mainSize]) {
                    itemStyle[mainSize] = style[mainSize];
                }
                if (mainSpace < itemStyle[mainSize]) {
                    flexLine.mainSpace = mainSpace;
                    flexLine.crossSpace = crossSpace;

                    flexLine = [];
                    flexLines.push(flexLine);

                    flexLine.push(item);

                    mainSpace = style[mainSize];
                    crossSpace = 0;
                } else {
                    flexLine.push(item);
                }
                if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                    crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
                }
                mainSpace -= itemStyle[mainSize];

            }
        }
        flexLine.mainSpace = mainSpace;
        console.log(items);

        //计算主轴
    }
}

module.exports = layout;