import BSOCombinedLogo from './bso';
// import EvergageIcon from './evergage';
import EvergageLogoVector from './evergage-logo';
import GitHubOctocat from './github';
import NpmLogo from './npm';
import PluralsightLogo from './pluralsight';
import SalesforceIcon from './salesforce';
import UpstatementU from './upstatement';

export {
    BSOCombinedLogo,
    EvergageLogoVector,
    GitHubOctocat,
    NpmLogo,
    PluralsightLogo,
    SalesforceIcon,
    UpstatementU,
};

// prettier-ignore
const resumeIconsMap = {
    "boston-symphony-orchestra": BSOCombinedLogo,
    "evergage": EvergageLogoVector,
    // "evergage": EvergageIcon,
    "github": GitHubOctocat,
    "npm": NpmLogo,
    "pluralsight": PluralsightLogo,
    "salesforce": SalesforceIcon,
    "upstatement": UpstatementU,
} as IconComponents;

export default resumeIconsMap;
