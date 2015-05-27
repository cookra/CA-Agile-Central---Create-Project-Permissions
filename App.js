Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        this.add({
            xtype  : 'rallybutton',
            text   : 'create',
            itemId: 'create-button',
            handler: function() {
                this.start();
            },
            scope: this
        });
    },
    start: function(){
        this.getModel().then({             
            success: this.createPP,
            scope: this
        }).then({                          
            success: this.readPP,
            scope: this
        }).then({                          
            success: function(result) {
                console.log('success', result);
            },
            failure: function(error) {
                console.log('oh noes!', error);
            }
        });
    },
    getModel: function() {
        return Rally.data.ModelFactory.getModel({
            type: 'ProjectPermission'
        });
    },
    
    createPP: function(model) {
        var project = this.getContext().getProject();
        var userRef = '/user/14095562577';
        
        var permission = Ext.create(model, {
            Project: project._ref,
            Role: 'Viewer',
            User: userRef
        });

        return permission.save();
    },
    
    readPP: function(permission){
        console.log(permisson);
        return permission.self.load(permission.getId(), {
            fetch: ['Project', 'User', 'Role']
        });
    }
});
