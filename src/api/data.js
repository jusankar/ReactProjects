import { MSA, STATE,COUNTY } from "./locData";
import { TEST_STATE_DATA, TEST_MSA_DATA } from "./mapData";
import { TEST_NODE_DATA } from "./nodeData";
import { TEST_SKILL_DATA } from "./testdata";

export class DataAPI {
  static async getLocations(locTypes) {
    const data = [];

    locTypes.forEach((loc) => {
      switch (loc) {
        case "state":
          const stateData = STATE.reduce((acc, { STATEFP, STUSPS, NAME }) => {
            acc.push({ id: STATEFP, code: STUSPS, name: NAME });
            return acc;
          }, []);
          data.push(...stateData);
          break;
        case "msa":
          const msaData = MSA.reduce((acc, { CSAFP, GEOID, NAME }) => {
            acc.push({ id: CSAFP, code: GEOID, name: NAME });
            return acc;
          }, []);
          data.push(...msaData);
          break;
        case "county":
          const countyData = COUNTY.reduce((acc, { COUNTYFP, GEOID, NAME }) => {
            acc.push({ id: COUNTYFP, code: GEOID, name: NAME });
            return acc;
          }, []);
          data.push(...countyData);
          break;
        default:
          break;
      }
    });
    return data;
  }

  static async getAllData() {
    // return TEST_SKILL_DATA.map(({ id, name }) => ({ id, name }));

    const data = TEST_SKILL_DATA.reduce((acc, { id, name }) => {
      acc.push({ id, name });
      return acc;
    }, []);
    return data;
  }

  static async getStateJobCount() {
    const totalJobCount = TEST_STATE_DATA.reduce((result, item) => {
      const jobCounts = item["Total Job Count"];
      return result.concat(jobCounts);
    }, []);
    return totalJobCount;
  }

  static async getMSAData() {
    const msaData = TEST_MSA_DATA.reduce((result, item) => {
      const msaJobCounts = item["Total Job Count"];
      return result.concat(msaJobCounts);
    }, []);
    return msaData;
  }

  static async getStateSalary() {
    const salary = TEST_STATE_DATA.reduce((result, item) => {
      const salaryValue = item["Salary"];
      return salaryValue;
    }, {});
    return Object.values(salary);
  }

  static async getNodeData(type) {
    const nodes = TEST_NODE_DATA.filter(
      (node) => node.target_tier === type || node.source_tier === type
    );
    const uniqueNodes = nodes.reduce((acc, node) => {
      const id =
        (type === "Executive" ? node.target : node.source_function) + type;
      if (!acc[id]) {
        acc[id] = {
          id: id,
          value: type === "Executive" ? node.target : node.source_function,
          tier: type,
        };
      }
      return acc;
    }, {});
    return Object.values(uniqueNodes);
  }

  static async getArrowData(tier, value) {
    let eFromData = [];
    let eToData = [];
    let fromData = [];
    let toData = [];
    //In case of tier is Executive
    if (tier === "Executive") {
      const fromNodes = TEST_NODE_DATA.filter(
        (node) => node.source_tier === tier && node.source === value
      );
      const dataFromNodes = fromNodes.reduce((acc, node, index) => {
        const id = "EF" + index + 1;
        if (!acc[id]) {
          acc[id] = {
            id: id,
            toolTipData: node.target,
            fromData:
              node.target_tier !== "Executive"
                ? node.target_function + node.target_tier
                : node.target + node.target_tier,
            toData: value + tier,
          };
        }
        return acc;
      }, {});
      const toNodes = TEST_NODE_DATA.filter(
        (node) => node.target_tier === tier && node.target === value
      );
      const dataToNodes = toNodes.reduce((acc, node, index) => {
        const id = "ET" + index;
        if (!acc[id]) {
          acc[id] = {
            id: id,
            toolTipData: "",
            fromData: value + tier,
            toData:
              node.source_tier !== "Executive"
                ? node.source_function + node.source_tier
                : node.source + node.source_tier,
          };
        }
        return acc;
      }, {});
      eFromData = Object.values(dataFromNodes);
      eToData = Object.values(dataToNodes);
    } else {
      // In case of Tier Staff and Management

      const fromNodes = TEST_NODE_DATA.filter(
        (node) => node.source_tier === tier && node.source_function === value
      );
      const dataFromNodes = fromNodes.reduce((acc, node, index) => {
        const id = "F" + index + 1;
        if (!acc[id]) {
          acc[id] = {
            id: id,
            toolTipData: node.target,
            fromData:
              node.target_tier !== "Executive"
                ? node.target_function + node.target_tier
                : node.target + node.target_tier,
            toData: value + tier,
          };
        }
        return acc;
      }, {});
      const toNodes = TEST_NODE_DATA.filter(
        (node) => node.target_tier === tier && node.target_function === value
      );
      const dataToNodes = toNodes.reduce((acc, node, index) => {
        const id = "T" + index;
        if (!acc[id]) {
          acc[id] = {
            id: id,
            toolTipData: "",
            fromData: value + tier,
            toData:
              node.source_tier !== "Executive"
                ? node.source_function + node.source_tier
                : node.source + node.source_tier,
          };
        }
        return acc;
      }, {});
      fromData = Object.values(dataFromNodes);
      toData = Object.values(dataToNodes);
    }
    return [...eFromData, ...eToData, ...fromData, ...toData];
  }
}
