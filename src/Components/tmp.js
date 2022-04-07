{true?(
    <Container>
        <InputGroup className="sm">
                    {/* <InputGroup.Text>Driving Mental Workload</InputGroup.Text> */}
                    {/* <FormControl value={this.state.rangeValue}/> */}
                    {/* <FormRange value={this.state.rangeValue}/> */}
                    <DropdownButton title="Driving Mental Workload" onSelect={this.buttonSelect}>
                        <Dropdown.Item eventKey="High Workload">High Workload</Dropdown.Item>
                        <Dropdown.Item eventKey="Medium Workload">Medium Workload</Dropdown.Item>
                        <Dropdown.Item eventKey="Low Workload">Low Workload</Dropdown.Item>
                    </DropdownButton>
                    <FormControl value={this.state.wl}/>
                    <Button variant="outline-secondary" onClick={this.handleBtClick}>
                        Next Video
                    </Button>
        </InputGroup>
    </Container>
    ):null}    