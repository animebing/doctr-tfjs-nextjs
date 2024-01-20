"use client";

export default () => {
  return (
    <div className="p-2 rounded border-2 flex flex-col gap-5 mb-3 lg:p-8 lg:rounded-lg">
      <div className="flex items-center gap-2">
        <img src="/doctr.svg" alt="logo" className="w-7 mb-1"/>
        <div className="text-xl lg:text-2xl font-semibold">
          Welcome to the docTR by mindee live demo page
        </div>
      </div>
      <div className="text-sm lg:text-base">
        <p>
          Upload an image and select models out{" "}
          <a href="https://mindee.github.io/doctr" _target="_blank" className="blue-underline">
            docTR
          </a>{" "}
          leveraged by{" "}
          <a href="https://www.tensorflow.org/js" _target="_blank" className="blue-underline">
            TensorFlow.js
          </a>{" "}
          to offer end-to-end OCR services, directly in your web browser.
        </p>
        <p className="mt-3">
          To know more about{" "}
          <a href="https://mindee.github.io/doctr" _target="_blank" className="blue-underline">
            docTR
          </a>{" "}
          check out the dedicated{" "}
          <a href="https://github.com/mindee/doctr" _target="_blank" className="blue-underline">
            Github repository.
          </a>{" "}
        </p>
      </div>
    </div>
  );
};
