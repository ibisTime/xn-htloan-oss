import Browser from './browser';

const Print = {
  send: (params) => {
    // Append iframe element to document body
    // document.getElementsByTagName('body')[0].appendChild(printFrame);

    // Get iframe element
    let iframeElement = document.getElementById(params.frameId);
    let printFrame = '';

    // Wait for iframe to load all content
    if (params.type === 'pdf' && (Browser.isIE() || Browser.isEdge())) {
      iframeElement.setAttribute('onload', finishPrint(iframeElement, params));
    } else {
      // var pwin = window.open('Print.htm', 'print');
      var pwin = window.open('Print.html', 'print', 'top=0, left=0, toolbar=no, menubar=no, resizable=no, location=no, status=no');
      printFrame = '<html><head><title>' + params.documentTitle + '</title>';

      let styleTags = document.getElementsByTagName('style');
      for (let i = 0; i < styleTags.length; i++) {
        printFrame += styleTags[i].outerHTML;
      }
      printFrame += '</head><body>' + params.htmlData + '</body></html>';
      pwin.document.write(printFrame);
      pwin.document.close();
      pwin.print();
    }
  }
};

function performPrint (iframeElement, params) {
  iframeElement.focus();

  // If Edge or IE, try catch with execCommand
  if (Browser.isEdge() || Browser.isIE()) {
    try {
      iframeElement.contentWindow.document.execCommand('print', false, null);
    } catch (e) {
      iframeElement.contentWindow.print();
    }
  } else {
    // Other browsers
    iframeElement.contentWindow.print();
  }
}

function finishPrint (iframeElement, params) {
  try {
    performPrint(iframeElement, params);
  } catch (error) {
    params.onError(error);
  }
}

export default Print;