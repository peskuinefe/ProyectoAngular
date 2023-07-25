const GlieceTasks = artifacts.require("GlieceTasks")

contract("GlieceTasks",()=>{

    before(async () =>{
        this.glieceTasks = await GlieceTasks.deployed()
    })

    it('migrate deployed successfully', async () => {
        const address = this.glieceTasks.address

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })
})