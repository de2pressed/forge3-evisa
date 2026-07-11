export default function OfficialMasthead() {
  return (
    <div className="official-header-identity" aria-label="Official India eVisa identity">
      <a className="official-logo-group boi-mark" href="https://boi.gov.in/" target="_blank" rel="noopener">
        <img src="/images/official/boi_logo_1.png" alt="Bureau of Immigration" />
        <span>Bureau of Immigration</span>
      </a>
      <div className="official-logo-group emblem-mark">
        <img src="/images/official/emblem.png" alt="Government of India emblem" />
        <span>Government of India</span>
      </div>
      <a className="official-logo-group evisa-mark" href="https://indianvisaonline.gov.in/evisa/" target="_blank" rel="noopener">
        <img src="/images/official/e-visa-logo.png" alt="India e-Visa" />
        <span>Indian e-Visa</span>
      </a>
    </div>
  );
}
