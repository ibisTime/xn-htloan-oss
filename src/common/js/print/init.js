import Html from './html';

export default {
  init() {
    let params = {
      printable: null,
      fallbackPrintable: null,
      type: 'html',
      header: null,
      headerStyle: 'font-weight: 300;',
      maxWidth: 800,
      font: 'TimesNewRoman',
      font_size: '12pt',
      honorMarginPadding: true,
      honorColor: false,
      properties: null,
      gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
      gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
      onError: (error) => {
        throw error;
      },
      onBrowserIncompatible: () => true,
      frameId: 'printJS',
      htmlData: '',
      documentTitle: 'Document',
      targetStyle: ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
      targetStyles: ['border', 'box', 'break', 'text-decoration'],
      ignoreElements: [],
      imageStyle: 'width:100%;',
      repeatTableHeader: true,
      style: null,
      scanStyles: true
    };

    // Check if a printable document or object was supplied
    let args = arguments[0];
    if (args === undefined) throw new Error('printJS expects at least 1 attribute.');

    // Process parameters
    switch (typeof args) {
      case 'string':
        params.printable = encodeURI(args);
        params.fallbackPrintable = params.printable;
        break;
      case 'object':
        params.printable = args.printable;
        params.fallbackPrintable = typeof args.fallbackPrintable !== 'undefined' ? args.fallbackPrintable : params.printable;
        params.frameId = typeof args.frameId !== 'undefined' ? args.frameId : params.frameId;
        params.header = typeof args.header !== 'undefined' ? args.header : params.header;
        params.headerStyle = typeof args.headerStyle !== 'undefined' ? args.headerStyle : params.headerStyle;
        params.maxWidth = typeof args.maxWidth !== 'undefined' ? args.maxWidth : params.maxWidth;
        params.font = typeof args.font !== 'undefined' ? args.font : params.font;
        params.font_size = typeof args.font_size !== 'undefined' ? args.font_size : params.font_size;
        params.honorMarginPadding = typeof args.honorMarginPadding !== 'undefined' ? args.honorMarginPadding : params.honorMarginPadding;
        params.properties = typeof args.properties !== 'undefined' ? args.properties : params.properties;
        params.gridHeaderStyle = typeof args.gridHeaderStyle !== 'undefined' ? args.gridHeaderStyle : params.gridHeaderStyle;
        params.gridStyle = typeof args.gridStyle !== 'undefined' ? args.gridStyle : params.gridStyle;
        params.onError = typeof args.onError !== 'undefined' ? args.onError : params.onError;
        params.onBrowserIncompatible = typeof args.onBrowserIncompatible !== 'undefined' ? args.onBrowserIncompatible : params.onBrowserIncompatible;
        params.documentTitle = typeof args.documentTitle !== 'undefined' ? args.documentTitle : params.documentTitle;
        params.targetStyle = typeof args.targetStyle !== 'undefined' ? args.targetStyle : params.targetStyle;
        params.targetStyles = typeof args.targetStyles !== 'undefined' ? args.targetStyles : params.targetStyles;
        params.ignoreElements = typeof args.ignoreElements !== 'undefined' ? args.ignoreElements : params.ignoreElements;
        params.imageStyle = typeof args.imageStyle !== 'undefined' ? args.imageStyle : params.imageStyle;
        params.repeatTableHeader = typeof args.repeatTableHeader !== 'undefined' ? args.repeatTableHeader : params.repeatTableHeader;
        params.style = typeof args.style !== 'undefined' ? args.style : params.style;
        params.scanStyles = typeof args.scanStyles !== 'undefined' ? args.scanStyles : params.scanStyles;
        break;
      default:
        throw new Error('Unexpected argument type! Expected "string" or "object", got ' + typeof args);
    }

    // Validate printable
    if (!params.printable) throw new Error('Missing printable information.');

    // To prevent duplication and issues, remove any used printFrame from the DOM
    let usedFrame = document.getElementById(params.frameId);

    if (usedFrame) usedFrame.parentNode.removeChild(usedFrame);

    // Create a new iframe or embed element (IE prints blank pdf's if we use iframe)
    // let printFrame;

    // // Create iframe element
    // printFrame = document.createElement('iframe');

    // // Hide iframe
    // // printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;');
    // printFrame.setAttribute('style', 'height: 100%; width: 100%; position: absolute;');

    // // Set iframe element id
    // printFrame.setAttribute('id', params.frameId);

    // For non pdf printing, pass an html document string to srcdoc (force onload callback)
    // printFrame.srcdoc = '<html><head><title>' + params.documentTitle + '</title>';
    // printFrame = '<html><head><title>' + params.documentTitle + '</title>';

    // let styleTags = document.getElementsByTagName('style');
    // for (let i = 0; i < styleTags.length; i++) {
    //   // printFrame.srcdoc += styleTags[i].outerHTML;
    //   printFrame += styleTags[i].outerHTML;
    // }

    // // printFrame.srcdoc += '</head><body></body></html>';
    // printFrame += '</head><body></body></html>';

    Html.print(params);
  }
};