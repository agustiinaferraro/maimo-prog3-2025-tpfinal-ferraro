const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200"
        width="60"
        height="60"
      >
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="5" r="5" cx="40" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65" 
            keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" />
        </circle>
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="5" r="5" cx="100" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65" 
            keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" />
        </circle>
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="5" r="5" cx="160" cy="65">
          <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65" 
            keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;