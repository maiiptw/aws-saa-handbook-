const fs = require('fs');
let content = fs.readFileSync('src/pages/[lang]/services/[slug].astro', 'utf8');

const importAsg = "import AsgSim from '../../../components/interactive/AsgSim';\n";
const importsToAdd = `import Route53Sim from '../../../components/interactive/Route53Sim';
import SnsSqsSim from '../../../components/interactive/SnsSqsSim';
import TransitGatewaySim from '../../../components/interactive/TransitGatewaySim';
`;

content = content.replace(importAsg, importAsg + importsToAdd);

const asgComponent = "{slug === 'asg' && <AsgSim client:visible />}\n";
const componentsToAdd = `    {slug === 'route53' && <Route53Sim client:visible />}
    {slug === 'sns' && <SnsSqsSim client:visible />}
    {slug === 'transit-gateway' && <TransitGatewaySim client:visible />}\n`;

content = content.replace(asgComponent, asgComponent + componentsToAdd);

fs.writeFileSync('src/pages/[lang]/services/[slug].astro', content);
