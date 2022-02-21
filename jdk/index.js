import fs from "fs";
import { microsoftBasePath } from "../config";

const { env } = process;

export const getInstalled = () => {
  const files = fs.readdirSync(microsoftBasePath);
  return files.filter((item) => item.toLowerCase().indexOf("jdk") >= 0);
};

export const isDefault = (version) => {
  return env["JAVA_HOME"].indexOf(version) >= 0;
};

export const updateVersion = (selectedJDK) => {
  return microsoftBasePath + selectedJDK;
};

export const updatePath = (currentJDK, selectedJDK) => {
  const javaPath = microsoftBasePath + selectedJDK;
  const paths = env["Path"].split(";");
  const updatedPaths = paths.filter(
    (path) => path !== currentJDK && path.length > 0
  );
  updatedPaths.push(javaPath);
  return updatedPaths.join(";");
};
