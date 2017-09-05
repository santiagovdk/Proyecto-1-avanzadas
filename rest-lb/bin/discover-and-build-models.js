var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.dataSources.sanjose;

ds.discoverAndBuildModels('cliente', {schema: 'public'}, function(err, models) {
  if (err) throw err;

  models.Cliente.find(function(err,tags) {
    if (err) return console.log(err);

    console.log(tags);

  //  ds.disconnect();
  });
  var json = JSON.stringify(models ,null,' ');
  console.log(json);
  ds.disconnect();
});


cb = function(err,data){
	if(err) return console.error(err);
	console.log(data);
};

ds.discoverModelDefinitions({Views:true, limit:20}, function(errs, models){
	if(errs) return console.error(errs);
  console.log("\nLos modelos encontrados son:")
	console.log(models);
  console.log('\n\n');
	});


ds.discoverSchema("cliente", {owner: 'public'}, cb);
