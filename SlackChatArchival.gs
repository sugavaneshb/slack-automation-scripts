/**
Slack Chat archival

Reference: http://jd.mares.co/tutorials/2015/09/20/slack-google-apps-script-stand-ups.html

- Update the spread sheet ID

For every channel, repeat this:

- On the menu click on Publish -> Deploy as Webapp and use it as the URL for outgoing webhook in slack

- Register an Outgoing webhook with the above webapp URL and get the token .

- Update the sheet name, token values
**/

function doPost(request) {

    var spreadSheetID = '***your spread sheet ID***';
    var channels_tokens_map = createChannelTokensMap();

    var spreadsheet = SpreadsheetApp.openById(spreadSheetID);
    var params = request.parameters;

    if (params.token in channels_tokens_map) {

	var sheet = spreadsheet.getSheetByName(channels_tokens_map[params.token]);
	var activeRow = getNextRow(sheet) + 1;

	// update the sheet
	sheets.getRangeByName('timestamp').getCell(activeRow,1).setValue(params.timestamp);
	sheets.getRangeByName('name').getCell(activeRow,1).setValue(params.user_name);
	sheets.getRangeByName('chat_message').getCell(activeRow,1).setValue(params.text);

    } else {
	Logger.log(params);
	Logger.log("Unknown channel. Or the token has not been registered");
	return;
    }
}

function getNextRow(sheets) {
    var timestamps = sheets.getRangeByName("timestamp").getValues();
    for (i in timestamps) {
	if(timestamps[i][0] == "") {
	    return Number(i);
	    break;
	}
    }
}

/** 
Logic to populate the initial tokens channel map.

 - Update this section with new channel and token. 
 - Ensure you have created the corresponding sheet in the spreadsheet as well.
*/
function createChannelTokensMap() {
    var tokens_channels_map = {};

    // format: tokens_channels_map[<token>] = '<channel>';

    return tokens_channels_map;
}
