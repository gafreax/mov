import { isDefault, updatePath, updateVersion } from ".";

beforeAll(() => {
  process.env = Object.assign(process.env, {
    JAVA_HOME: "C:\\Program Files\\Microsoft\\jdk-11.0.13.8-hotspot",
  });
  process.env = Object.assign(process.env, {
    Path: "C:\\WINDOWS\\system32;C:\\WINDOWS;",
  });
});
const current = "jdk-11.0.13.8-hotspot";
const selected = "jdk-11.0.13.8-hotspot";

describe("Microsoft OpenJDKs management", () => {
  test("updateVersion: update java version in JAVA_HOME", () => {
    const paths = updateVersion(selected);
    expect(paths).toContain(selected);
  });

  test("isDefault: check if is default jdk", () => {
    const bad = isDefault("23");
    expect(bad).toBeFalsy();
    const good = isDefault(current);
    expect(good).toBeTruthy();
  });

  test("updatePath: update system path to add openjdk avaiable", () => {
    console.log('gaf log ==> env["Path"]', process.env["Path"]);
    const path = updatePath(current, selected);
    console.log("gaf log ==> paths", path);
    expect(path).toContain(selected);
  });
});
