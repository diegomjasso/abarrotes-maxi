import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Box } from "@mui/material";

const BarcodeScanner = ({ onDetected }) => {
	const videoRef = useRef(null);
	const controlsRef = useRef(null);

	useEffect(() => {
		const codeReader = new BrowserMultiFormatReader();

		const startScanner = async () => {
			try {
				controlsRef.current =
					await codeReader.decodeFromConstraints(
						{
							video: {
								facingMode: { ideal: "environment" }, // 🔥 cámara trasera
							},
						},
						videoRef.current,
						(result) => {
							if (result) {
								onDetected(result.getText());
							}
						}
					);
			} catch (error) {
				console.error("Error iniciando cámara:", error);
			}
		};

		startScanner();

		return () => {
			if (controlsRef.current) {
				controlsRef.current.stop();
			}
		};
	}, [onDetected]);

	return (
		<Box>
			<video
				ref={videoRef}
				style={{
					width: "100%",
					borderRadius: 12,
				}}
				autoPlay
				playsInline
				muted
			/>
		</Box>
	);
};

export default BarcodeScanner;