# Annotations Action
This action intakes test output and then raises errors if it finds any in the test output. 

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
There are two mandatory inputs to this action
- `result_path`: The path to the JSON file that we want to read in 
- `report_type`: whether or not this JSON file matches Codecept's JSON output spec

## Example Workflow
```yaml
  - name: Annotate failures
    uses: Bluescape/github-annotations-action@v0.0.3
    with: 
        report_path: ./output/report.json
        report_type: codeceptjs
```
This will read the `report.json` at `./output/` and parse it as if it were a CodeceptJS json. 

## To Do
Implement the ability to take in more types of output and parse them. 
