
import { Container, Section, Grid, Stack, Box, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LayoutDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Layout Component System" 
        description="A showcase of standardized layout components for consistent spacing and alignment"
        actions={<Button>Example Action</Button>}
      />
      
      <Section>
        <Container>
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Container Component</h2>
            <p className="text-muted-foreground">
              The Container component provides consistent horizontal padding and max-width constraints
            </p>
            
            <Box border shadow="sm" className="bg-muted/30">
              <p>This content is inside a Container with default (lg) size</p>
            </Box>
            
            <Grid cols={3} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Small Container</CardTitle>
                </CardHeader>
                <CardContent>
                  <Container size="sm" className="bg-muted/30 p-4 rounded">
                    <p>640px max-width</p>
                  </Container>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Container</CardTitle>
                </CardHeader>
                <CardContent>
                  <Container size="md" className="bg-muted/30 p-4 rounded">
                    <p>768px max-width</p>
                  </Container>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Container</CardTitle>
                </CardHeader>
                <CardContent>
                  <Container size="lg" className="bg-muted/30 p-4 rounded">
                    <p>1024px max-width</p>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
      
      <Section className="bg-muted/30">
        <Container>
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Section Component</h2>
            <p className="text-muted-foreground">
              The Section component provides consistent vertical spacing
            </p>
            
            <Grid cols={3} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Small Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-4 rounded">
                    <Section spacing="sm" className="bg-primary/20 rounded">
                      <p>16px padding top & bottom</p>
                    </Section>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-4 rounded">
                    <Section spacing="md" className="bg-primary/20 rounded">
                      <p>32px padding top & bottom</p>
                    </Section>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 p-4 rounded">
                    <Section spacing="lg" className="bg-primary/20 rounded">
                      <p>64px padding top & bottom</p>
                    </Section>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Grid Component</h2>
            <p className="text-muted-foreground">
              The Grid component provides consistent column layouts
            </p>
            
            <Grid cols={3} gap="md">
              <Box border padding="sm" className="bg-muted/30">Item 1</Box>
              <Box border padding="sm" className="bg-muted/30">Item 2</Box>
              <Box border padding="sm" className="bg-muted/30">Item 3</Box>
              <Box border padding="sm" className="bg-muted/30">Item 4</Box>
              <Box border padding="sm" className="bg-muted/30">Item 5</Box>
              <Box border padding="sm" className="bg-muted/30">Item 6</Box>
            </Grid>
            
            <h3 className="text-xl font-bold mt-8">Grid Columns</h3>
            
            <Grid cols={2} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>2-column Grid</CardTitle>
                </CardHeader>
                <CardContent>
                  <Grid cols={2} gap="sm">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                  </Grid>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>4-column Grid</CardTitle>
                </CardHeader>
                <CardContent>
                  <Grid cols={4} gap="sm">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 3</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 4</Box>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
      
      <Section className="bg-muted/30">
        <Container>
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Stack Component</h2>
            <p className="text-muted-foreground">
              The Stack component provides consistent spacing between items
            </p>
            
            <Grid cols={2} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Vertical Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 3</Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Horizontal Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack direction="row" spacing="md">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 3</Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid cols={3} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Small Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="sm">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Spacing</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack spacing="lg">
                    <Box border padding="sm" className="bg-muted/30">Item 1</Box>
                    <Box border padding="sm" className="bg-muted/30">Item 2</Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Box Component</h2>
            <p className="text-muted-foreground">
              The Box component provides consistent padding, borders and shadows
            </p>
            
            <Grid cols={3} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Small Padding</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="sm" border className="bg-muted/30">
                    <p>8px padding</p>
                  </Box>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Padding</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="md" border className="bg-muted/30">
                    <p>16px padding</p>
                  </Box>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Padding</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="lg" border className="bg-muted/30">
                    <p>24px padding</p>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid cols={3} gap="md">
              <Card>
                <CardHeader>
                  <CardTitle>Small Shadow</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="md" shadow="sm" className="bg-card">
                    <p>Small shadow</p>
                  </Box>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Medium Shadow</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="md" shadow="md" className="bg-card">
                    <p>Medium shadow</p>
                  </Box>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Large Shadow</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box padding="md" shadow="lg" className="bg-card">
                    <p>Large shadow</p>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </div>
  );
};

export default LayoutDemo;
