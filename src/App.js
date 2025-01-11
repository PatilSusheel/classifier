// import React, { useState } from "react";

// export default function Import() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [predictionResult, setPredictionResult] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];

//     if (file && file.type.startsWith("image/")) {
//       setSelectedImage(file);

//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setErrorMessage("Please select a valid image file (PNG, JPG, etc.)");
//       setSelectedImage(null);
//       setPreviewImage(null);
//     }
//   };

//   const postImage = async () => {
//     try {
//       if (!selectedImage) {
//         setErrorMessage("No image selected");
//         return;
//       }

//       setIsLoading(true);
//       setErrorMessage(null);

//       const formData = new FormData();
//       formData.append("file", selectedImage); 

//       const response = await fetch("http://127.0.0.1:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPredictionResult(data);
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       setErrorMessage("Error uploading image. Please try again.");
//       console.error("Error uploading image:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="preview mx-3 my-3">
//         <label htmlFor="imageInput">Select an Image:</label>
//         <input
//           className="select-image mx-2"
//           type="file"
//           id="imageInput"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         {previewImage && (
//           <div className="ig">
//             <p>Preview:</p>
//             <img src={previewImage} alt="Selected" style={{ maxWidth: "60%" }} />
//           </div>
//         )}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
//           <button
//             type="button"
//             className="btn btn-success mx-3"
//             onClick={postImage}
//             disabled={isLoading}
//           >
//             {isLoading ? "Predicting..." : "Predict"}
//           </button>
//         </div>
//         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//         {predictionResult && (
//           <div className="result">
//             <h3>Prediction Result:</h3>
//             <p>Class: {predictionResult.predicted_class}</p>
//             <p>Confidence: {(predictionResult.confidence * 100).toFixed(2)}%</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Import() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage("Please select a valid image file (PNG, JPG, etc.)");
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  const postImage = async () => {
    try {
      if (!selectedImage) {
        setErrorMessage("No image selected");
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionResult(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setErrorMessage("Error uploading image. Please try again.");
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header text-center bg-primary text-white">
          <h4>Image Classifier</h4>
        </div>
        <div className="card-body">
          <div className="form-group mb-4">
            <label htmlFor="imageInput" className="form-label">
              Upload an Image
            </label>
            <input
              className="form-control"
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {previewImage && (
            <div className="text-center mb-4">
              <h5>Preview</h5>
              <img
                src={previewImage}
                alt="Selected"
                className="img-fluid rounded border"
                style={{ maxWidth: "70%" }}
              />
            </div>
          )}

          <div className="text-center">
            <button
              className="btn btn-success me-3"
              onClick={postImage}
              disabled={isLoading}
            >
              {isLoading ? "Predicting..." : "Predict"}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setSelectedImage(null);
                setPreviewImage(null);
                setPredictionResult(null);
                setErrorMessage(null);
              }}
              disabled={isLoading}
            >
              Reset
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-danger mt-4 text-center">
              {errorMessage}
            </div>
          )}

          {predictionResult && (
            <div className="mt-4 text-center">
              <h5 className="text-success">Prediction Result</h5>
              <p className="mb-1">
                <strong>Class:</strong> {predictionResult.predicted_class}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {(predictionResult.confidence * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
        <div className="card-footer text-muted text-center">
          Powered by Flask and React
        </div>
      </div>
    </div>
  );
}
