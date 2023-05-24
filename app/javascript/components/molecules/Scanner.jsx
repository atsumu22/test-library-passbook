import React, { useEffect } from "react";
import Quagga from "quagga";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import config from "./config.json"


const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    //detecting boxes on stream
    Quagga.onProcessed(result => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = result => {
    result.codeResult.code.slice(0, 3) === "978" && onDetected(result.codeResult.code);
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <>
      <SScannerContainer>
        <SScanner id="interactive" className="viewport" />
      </SScannerContainer>
      <SNotation>☝️☝️☝️</SNotation>
      <SNotation>
        987から始まる上段のバーコードを画面に合わせてスキャンしてください
      </SNotation>
    </>
  );
};

const SScannerContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100px;
  overflow: hidden;
`;

const SScanner = styled.div`
  width: 100vw;
  height: 100px;
  & canvas,video {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  & canvas.drawingBuffer,video.drawingBuffer {
    width: 100%;
    height: auto;
  }
`;

const SNotation = styled.p`
  text-align: center;
  width: 80%;
  margin: 0 auto;
`;

export default Scanner;
