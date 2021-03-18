import * as React from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { types } from './Constant';
import { Label,Error } from '@progress/kendo-react-labels';
//Numeric Textbox cell
const minMaxValidation = (value) => {
  if(value <= 0 || value > 100){
    return false;
  }
  return true;
}

const ValidationCell = props => {
  const handleOnChange = e => {
    props.onChange({
      dataItem: props.dataItem,
      field: props.field,
      syntheticEvent: e.syntheticEvent,
      value: e.value
    });
  };
  return (
    <td>
      <NumericTextBox
        required
        value={props.dataItem[props.field]}
        onChange={handleOnChange}
      />
      {!props.validationLogic(props.dataItem[props.field])&& <Error>This is not valid</Error>}
    </td>
  );
};
//Till Here

export const PersonalDetails = props => {
  const editField = "inEdit";
  const filteredBeneficiary = props.data.filter(item => item.isActive === true);
  //const [editID, seteditID] = useState(null);
//Input text cell
const MyValidationCell = (props) => <ValidationCell {...props} validationLogic={minMaxValidation}/>
  //Dropdown cell
  
  const CustomTypeCell = props => {
    const handleOnChange = e => {
      props.onChange({
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value
      });
    };
    return (
      <td>
        <DropDownList
          //value={props.dataItem.type}
          value={types.find(type => type === props.dataItem[props.field])}
          data={types}
          onChange={handleOnChange}
          // onChange={e => {
          //   props.onChange({
          //     dataItem: props.dataItem,
          //     field: props.field,
          //     syntheticEvent: e.syntheticEvent,
          //     //value: e.target.value.value
          //     value: e.target.value
          //   });
          // }}
        />
      </td>
    );
  }

  const MyCustomTypeCell = props => (
    <CustomTypeCell {...props}  />
  );
  //Ends Here

  const itemChange = (e) => {
    //debugger;
    let arr = [...props.data]
    arr = arr.map(item =>
      item.id === e.dataItem.id ?
          { ...item, [e.field]: e.value } : item
  );
  console.log("on Item change updated array with new value");
  console.log(arr)
  props.setData(arr);
  console.log("on Item change updated prop data");
  console.log(...props.data)
  }

  //console.log(props.formProps.valueGetter("userName"));
  return (
    <div >
      <Grid 
        style={{ height: '450px', width:'600px' }}
        data={filteredBeneficiary}
        editField={editField}
        onItemChange={itemChange}
      >
        <Column field="name" title="Name" editable={false} />
        <Column field="dateOfBirth" title="Date of Birth" format="{0:MM/dd/yyyy}" editable={false} />
        <Column field="relationship" title="Relationship" editable={false} />
        <Column field="type" title="Type" cell={MyCustomTypeCell} editor="text" />
        <Column field="percentage" title="Percentage" cell={MyValidationCell} />
        {/* <Column field="percentage" title="Percentage" editor="numeric" /> */}
        {/* <Column cell={MyEditCommandCell} />
        <Column cell={MyRemoveCommandCell} /> */}
      </Grid>
    </div>
  );
};
