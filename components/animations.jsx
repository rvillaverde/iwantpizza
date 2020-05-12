export const LoadingAnimation = () =>
<svg style={{ margin: "auto", display: "block" }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" fill="none" stroke="#eca442" strokeWidth="2" r="8" strokeDasharray="37.69911184307752 14.566370614359172" transform="rotate(299.474 50 50)">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
  </circle>
</svg>;
