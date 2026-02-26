import { getFormByEndpointIdPublic } from "../src/db/actions/form.actions";

async function check() {
    const endpointId = "nY5j-T3DdYCv";
    const form = await getFormByEndpointIdPublic(endpointId);
    console.log(JSON.stringify(form, null, 2));
    process.exit(0);
}

check();
