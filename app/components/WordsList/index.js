'use client';

import { TailSpin } from 'react-loader-spinner';

export default ({
  fieldRefsObject,
  extractingWords,
  words,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base lg:text-lg font-medium mb-3">
        4 - Visualize word values
      </div>
      <div className="h-[435px] overflow-auto">
        {!extractingWords && !words.length && (
          <div className="h-full rounded border-x border-y border-gray-200 flex justify-center items-center">
            <div className="text-xs lg:text-sm">
              No image uploaded yet
            </div>
        </div>
        )}
        {extractingWords ? (
          <div className="h-full rounded border-x border-y border-gray-200 flex justify-center items-center">
            <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
          </div>
        ) : (
          words.map((word, idx) => (
            <div
              key={idx}
              ref={fieldRefsObject[idx]}
              className='w-full p-5 cursor-pointer border-solid border-b border-gray-100 border-l-[3px] border-l-transparent hover:border-l-8'
              style={{
                borderLeftColor: word.color,
                borderLeftWidth: word.isActive ? 8 : undefined,
              }}  
            >
              <span key={idx}> {word.words.join(", ")} </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
