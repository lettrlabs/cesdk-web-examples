import CreativeEditorSDK from '@cesdk/cesdk-js';
import React, { useEffect, useRef } from 'react';

const CaseComponent = () => {
  const cesdk_container = useRef(null);
  useEffect(() => {
    const config = {
      theme: 'dark',
      license: process.env.REACT_APP_LICENSE,
      view: "",
      role: "Creator",
      ui: {
        elements: {
          view: 'advanced',
          panels: {
            inspector: {
              show: true,
              position: 'right'
            },
            settings: true
          },
          dock: {
            iconSize: 'normal',
            hideLabels: true
          },
          navigation: {
            action: {
              load: true,
              export: {
                show: true,
                format: ['image/png', 'application/pdf']
              }
            }
          }
        }
      },
      callbacks: {
        onExport: 'download',
        onUpload: 'local',
        onLoad: (scene) => {
          let dakine = prompt("input scene");
          return Promise.resolve(dakine);
        },
      }
    };


    let cesdk;
    if (cesdk_container.current) {
      CreativeEditorSDK.init(cesdk_container.current, config).then(
        (instance) => {
          cesdk = instance;
        }
      );
    }
    return () => {
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, [cesdk_container]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="caseHeader">
        <h3>Advanced UI – Create Templates</h3>
      </div>
      <div style={wrapperStyle}>
        <div ref={cesdk_container} style={cesdkStyle}></div>
      </div>
    </div>
  );
};

const cesdkStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '0.75rem'
};

const wrapperStyle = {
  borderRadius: '0.75rem',
  minHeight: '0', // stops editor from growing when opening a panel
  flexGrow: '1',
  boxShadow:
    '0px 0px 2px rgba(0, 0, 0, 0.25), 0px 18px 18px -2px rgba(18, 26, 33, 0.12), 0px 7.5px 7.5px -2px rgba(18, 26, 33, 0.12), 0px 3.75px 3.75px -2px rgba(18, 26, 33, 0.12)'
};

export default CaseComponent;
