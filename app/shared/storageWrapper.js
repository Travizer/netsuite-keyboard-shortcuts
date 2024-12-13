import { v4 as uuid } from "uuid"

const CHUNK_SIZE = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - 1000; // Define chunk size

const DEFAULT_SHORTKEYS_JSON = "["

  + "{\"key\": \"h o m\",\"label\": \"homepage\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/center/card.nl?sc=-29&whence='; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s o l\",\"label\": \"sales order list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=SalesOrd&quicksort=Transction_DATATED11_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s o n\",\"label\": \"sales order - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/salesord.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"p o l\",\"label\": \"purchase order list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=PurchOrd&quicksort=Transction_DATATED11_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"p o n\",\"label\": \"purchase order - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/purchord.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i n l\",\"label\": \"invoice list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustInvc&quicksort=Transction_DATATED11_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i n n\",\"label\": \"invoice - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custinvc.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"v b l\",\"label\": \"vendor bill list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=VendBill&quicksort=Transction_DATATED11_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"v b n\",\"label\": \"vendor bill - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/vendbill.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c u l\",\"label\": \"customer list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/custjoblist.nl?searchtype=Customer&quicksort=Entity_DATECREATED_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c u n\",\"label\": \"customer - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/custjob.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"v e l\",\"label\": \"vendor list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/vendorlist.nl?searchtype=Vendor&quicksort=Entity_DATECREATED_raw'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"v e n\",\"label\": \"vendor - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/vendor.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i f l\",\"label\": \"item fulfilment list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=ItemShip'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i t l\",\"label\": \"item list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/item/itemlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i t n\",\"label\": \"item - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/item/item.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i r l\",\"label\": \"item receipt list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=ItemRcpt'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"w o l\",\"label\": \"work order list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=WorkOrd'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"w o n\",\"label\": \"work order - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/workord.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"b o l\",\"label\": \"bom list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/manufacturing/bomlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"j e l\",\"label\": \"journal entry list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=Journal'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"j e n\",\"label\": \"journal entry - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/journal.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"t i m\",\"label\": \"timesheets\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/time/weeklytimebill.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"e m l\",\"label\": \"employee list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/employeelist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"e m n\",\"label\": \"employee - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/employee.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"u s l\",\"label\": \"user list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/listusers.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"r o l\",\"label\": \"roles\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/rolelist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s u b\",\"label\": \"subsidiaries\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/subsidiarylist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"d e p\",\"label\": \"departments\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/departmentlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"l o c\",\"label\": \"locations\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/locationlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c l a\",\"label\": \"classes\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/classlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s s l\",\"label\": \"saved search list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/search/savedsearchlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s s n\",\"label\": \"saved search - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/search/search.nl?cu=T&e=F'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"f i l\",\"label\": \"file cabinet\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/media/mediaitemfolders.nl?sc=-63'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s a n\",\"label\": \"sandbox management\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/sandboxaccounts.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"b i l\",\"label\": \"billing information\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/billing/billingevents.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"p p r\",\"label\": \"personal preferences\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/center/userprefs.nl?sc=-29'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s p r\",\"label\": \"system preferences\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/general.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"e p r\",\"label\": \"email preferences\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/emailpreferences.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"a p r\",\"label\": \"accounting preferences\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/acctsetup.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c o a\",\"label\": \"chart of accounts\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/account/accounts.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"m a p\",\"label\": \"manage accounting periods\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/period/fiscalperiods.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"m t p\",\"label\": \"manage tax periods\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/period/taxperiods.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c u r\",\"label\": \"currencies\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/multicurrency/currencylist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c e r\",\"label\": \"currency exchange rates\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/multicurrency/currencyratelist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c m l\",\"label\": \"credit memo list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustCred'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c m n\",\"label\": \"credit memo - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custcred.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c d l\",\"label\": \"customer deposit list\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustDep'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c d n\",\"label\": \"customer deposit - new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custdep.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"c o m\",\"label\": \"company information\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/company.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"i c s\",\"label\": \"import CSV\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/assistants/nsimport/importassistant.nl?new=T'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s c s\",\"label\": \"saved CSV imports\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/assistants/nsimport/savedimports.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"p d f\",\"label\": \"advanced HTML/PDF tmp\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/custom/pdftemplates.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s c r a l l\",\"label\": \"scripts\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/scripting/scriptlist.nl?scripttype='; window.open(f,'_self');})()\"},"
  + "{\"key\": \"w o r\",\"label\": \"workflows\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/workflow/setup/workflowlist.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"r e c\",\"label\": \"record types\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/custom/custrecords.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"b i n\",\"label\": \"bundles installed\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/bundler/bundlelist.nl?type=I'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"b c r\",\"label\": \"bundles created\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/bundler/bundlelist.nl?type=S'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"e n a\",\"label\": \"enable features\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/features.nl'; window.open(f,'_self');})()\"},"
  + "{\"key\": \"s r e\",\"label\": \"scripted records\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/scripting/scriptedrecords.nl'; window.open(f,'_self');})()\"},"

  + "{\"key\": \"n e w\",\"label\": \"function:transaction-new\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript:NLInvokeButton(getButton('new'))\"},"
  + "{\"key\": \"c o p y\",\"label\": \"function:transaction-copy\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript:NLInvokeButton(getButton('makecopy'))\"},"
  + "{\"key\": \"d e l e t e\",\"label\": \"function:transaction-delete\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript:NLInvokeButton(getButton('delete'))\"},"
  + "{\"key\": \"m e m o\",\"label\": \"function:transaction-memorize\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript:NLInvokeButton(getButton('memorize'))\"},"
  + "{\"key\": \"e m a i l\",\"label\": \"function:transaction-email\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript:NLInvokeButton(getButton('email'))\"},"
  + "{\"key\": \"ctrl+shift+1\",\"label\": \"function:open-shortcuts\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: /*--do not remove this comment--*/ (function() {f = 'https://www.travizer.com/netsuite-keyboard-shortcuts-list.html';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"ctrl+shift+2\",\"label\": \"function:mark-madatory-fields\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"var spans= document.getElementsByTagName('span'); for (var i = 0, len = spans.length; i < len; ++i) {  if(spans[i].innerHTML.indexOf('uir-required-icon') !== -1 && spans[i].id.indexOf('_label') == -1 ) {     spans[i].style.backgroundColor = 'yellow'; } }\"},"

  + "{\"key\": \"n h o m\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/center/card.nl?sc=-29&whence=';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s o l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=SalesOrd&quicksort=Transction_DATATED11_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s o n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/salesord.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n p o l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=PurchOrd&quicksort=Transction_DATATED11_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n p o n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/purchord.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i n l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustInvc&quicksort=Transction_DATATED11_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i n n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custinvc.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n v b l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=VendBill&quicksort=Transction_DATATED11_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n v b n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/vendbill.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c u l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/custjoblist.nl?searchtype=Customer&quicksort=Entity_DATECREATED_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c u n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/custjob.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n v e l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/vendorlist.nl?searchtype=Vendor&quicksort=Entity_DATECREATED_raw';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n v e n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/vendor.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i f l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=ItemShip';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i t l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/item/itemlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i t n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/item/item.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i r l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=ItemRcpt';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n w o l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=WorkOrd';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n w o n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/workord.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n b o l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/manufacturing/bomlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n j e l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=Journal';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n j e n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/journal.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n t i m\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/time/weeklytimebill.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n e m l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/employeelist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n e m n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/entity/employee.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n u s l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/listusers.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n r o l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/rolelist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s u b\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/subsidiarylist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n d e p\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/departmentlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n l o c\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/locationlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c l a\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/classlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s s l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/search/savedsearchlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s s n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/search/search.nl?cu=T&e=F';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n f i l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/media/mediaitemfolders.nl?sc=-63';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s a n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/sandboxaccounts.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n b i l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/billing/billingevents.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n p p r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/center/userprefs.nl?sc=-29';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s p r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/general.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n e p r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/emailpreferences.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n a p r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/acctsetup.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c o a\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/account/accounts.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n m a p\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/period/fiscalperiods.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n m t p\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/period/taxperiods.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c u r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/multicurrency/currencylist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c e r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/multicurrency/currencyratelist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c m l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustCred';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c m n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custcred.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c d l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustDep';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c d n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/accounting/transactions/custdep.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n c o m\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/otherlists/company.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n i c s\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/assistants/nsimport/importassistant.nl?new=T';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s c s\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/assistants/nsimport/savedimports.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n p d f\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/custom/pdftemplates.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s c r a l l\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/scripting/scriptlist.nl?scripttype=';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n w o r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/workflow/setup/workflowlist.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n r e c\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/custom/custrecords.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n b i n\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/bundler/bundlelist.nl?type=I';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n b c r\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/bundler/bundlelist.nl?type=S';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n e n a\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/setup/features.nl';if (!window.open(f)) location.href = f;})()\"},"
  + "{\"key\": \"n s r e\",\"label\": \"newtab\",\"action\": \"javascript\",\"sites\": \"\",\"sitesArray\": [\"\"],\"activeInInputs\": true,\"blacklist\": false,\"code\": \"javascript: (function() {f = window.location.href.split('app/')[0] + 'app/common/scripting/scriptedrecords.nl';if (!window.open(f)) location.href = f;})()\"}"

  + "]";

class StorageWrapper {
  static _splitIntoChunks(data) {
    let chunks = [];
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      chunks.push(data.substring(i, i + CHUNK_SIZE));
    }
    return chunks;
  }

  static _saveLargeData(key, data, callback) {
    chrome.storage.sync.get(null, (result) => {
      const length = result[`${key}_length`];
      if (length !== undefined) {
        const keysToRemove = Array.from({ length }, (_, index) => `${key}_part${index}`);
        keysToRemove.push(`${key}_length`);

        chrome.storage.sync.remove(keysToRemove, () => {
          this._saveDataChunks(key, data, callback);
        });
      } else {
        this._saveDataChunks(key, data, callback);
      }
    });
  }

  static _saveDataChunks(key, data, callback) {
    const chunks = this._splitIntoChunks(data);
    const storageObject = {};

    storageObject[`${key}_length`] = chunks.length;
    chunks.forEach((chunk, index) => {
      storageObject[`${key}_part${index}`] = chunk;
    });

    chrome.storage.sync.set(storageObject, callback);
  }

  static _loadLargeData(key, callback) {
    chrome.storage.sync.get(null, (result) => {
      const length = result[`${key}_length`];
      if (length === undefined) {
        callback(null);
        return;
      }

      const chunks = [];
      for (let i = 0; i < length; i++) {
        chunks.push(result[`${key}_part${i}`]);
      }
      callback(chunks.join(''));
    });
  }

  static get shortkeys() {
    return new Promise((resolve) => {
      this._loadLargeData('shortkeys', (data) => {
        if (data) {
          let jsonData = JSON.parse(data);
          if (jsonData.keys && Array.isArray(jsonData.keys)) {
            const transformedKeys = jsonData.keys.map(key => ({
              ...key,
              id: uuid(),
            }));
            this._saveLargeData('shortkeys', JSON.stringify(transformedKeys), () => {
              console.log("Shortkeys data migrated and saved in chunks to chrome.storage.sync.");
            });
            resolve({ keys: JSON.stringify(transformedKeys) });
          } else {
            resolve({ keys: data });
          }
        } else {
          resolve({ keys: null });
        }
      });
    });
  }

  static set shortkeys(value) {
    this._saveLargeData('shortkeys', value.keys, () => {
      console.log("Shortkeys data saved in chunks to chrome.storage.sync.");
    });
  }

  static async initShortkeys() {
    const shortkeysData = await StorageWrapper.shortkeys;
    if (!shortkeysData || !shortkeysData.keys || !shortkeysData.keys.length) {
      const updatedShortkeys = JSON.parse(StorageWrapper.defaultShortkeysJson()).map(key => ({
        ...key,
        id: uuid(),
      }));
      StorageWrapper.shortkeys = { keys: JSON.stringify(updatedShortkeys) };
      console.log('Default shortkeys set in Chrome Storage.');
    } else {
      console.log('Shortkeys data already exists in Chrome Storage.');
    }
  }

  static defaultShortkeysJson() {
    return DEFAULT_SHORTKEYS_JSON;
  }
}

//module.exports = StorageWrapper;
export default StorageWrapper;

//const storageWrapper = new StorageWrapper();
