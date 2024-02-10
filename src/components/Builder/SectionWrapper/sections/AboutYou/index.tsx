import withSectionHOC from "../withSectionHOC";
import AboutYouEditor from "./AboutYouEditor";

const AboutYou = withSectionHOC(
  ({ onFocus, onBlur, isSectionInEditMode, onSave }) => {
    return <AboutYouEditor onBlur={onBlur} onFocus={onFocus} />;
  }
);

export default AboutYou;
