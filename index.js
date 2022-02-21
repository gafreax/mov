import term from "terminal-kit";
import { microsoftBasePath } from "./config.js";
import { getInstalled, isDefault, updateVersion } from "./jdk";

const { terminal } = term;
const jdks = getInstalled();
export const buildTable = () => {
  return jdks.map((jdk) => {
    const version = jdk.split("-")[1];
    return [microsoftBasePath + jdk, version, isDefault(jdk) ? "yes" : "no"];
  });
};

terminal.table([["Path", "Version", "Default"], ...buildTable()], tableConfig);

terminal.singleLineMenu(
  jdks,
  {
    style: terminal.inverse,
    selectedStyle: terminal.dim.blue.bgBrightWhite,
  },
  (error, response) => {
    const { selectedText } = response;
    terminal("\n").eraseLineAfter.brightCyan("selected: %s\n", selectedText);
    updateVersion(selectedText);
    process.exit();
  }
);
