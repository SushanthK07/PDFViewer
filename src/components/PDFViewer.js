import React, { Component } from "react";
import { Link } from "react-router-dom";

function initPDFJs(source, iframeContainer) {
    const iframe = document.createElement('iframe');
    iframe.src = `/pdfjs-iframe/web/viewer.html?file=${source}`;
    iframe.width = '100%';
    iframe.height = '900px';
    iframeContainer.appendChild(iframe);
}

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.iframeContainerRef = React.createRef();
  }

  componentDidMount() {
    const { src } = this.props;
    const iframeContainer = this.iframeContainerRef.current;
    initPDFJs(src, iframeContainer);
  }

  render() {
    return (
      <>
        <div>
          <Link to="/">
            <button>Back</button>
          </Link>
          <span>
            {" "}Here we will use the PDFJS iframe and we will implement our features
            on top of it.
          </span>
        </div>
        <div
          ref={this.iframeContainerRef}
          id="iframeContainer"
          style={{ width: "100%", height: "100%" }}
        ></div>
      </>
    );
  }
}

export default PDFViewer;
