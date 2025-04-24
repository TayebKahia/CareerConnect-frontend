"use client"

import { CheckCircle, FileText, Star, User, Briefcase, GraduationCap, Download } from "lucide-react"
import Link from "next/link"
import { useToast } from "../../../hooks/use-toast"
import { Badge } from "../../../components/badge"
import { Button } from "../../../components/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/card"
import { useCandidates } from "../../../context/candidates-context"

export default function CVRankingPage() {
  const { toast } = useToast()
  const { simpleCandidates, toggleCandidateSelection, selectedCount } = useCandidates()

  // Export selected candidates
  const exportSelected = () => {
    const selectedCandidates = simpleCandidates.filter((candidate) => candidate.selected)

    if (selectedCandidates.length === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one candidate to export.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    // In a real application, this would generate a CSV or PDF
    // For now, we'll just show a toast and log to console
    console.log("Exporting selected candidates:", selectedCandidates)

    toast({
      title: "Candidates exported",
      description: `${selectedCandidates.length} candidate(s) have been exported.`,
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">CV Ranking</h1>
          <p className="text-muted-foreground">Review and select the best candidates for your open positions</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              {simpleCandidates.length} Candidates
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {selectedCount} Selected
            </Badge>
          </div>
          <Button onClick={exportSelected}>
            <Download className="mr-2 h-4 w-4" />
            Export Selected
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {simpleCandidates.map((candidate) => (
            <Card key={candidate.id} className={candidate.selected ? "border-2 border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <CardTitle>{candidate.name}</CardTitle>
                    <CardDescription>{candidate.position}</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{candidate.matchScore}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Experience: {candidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Education: {candidate.education}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/cv-details/${candidate.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View CV
                  </Link>
                </Button>
                <Button
                  variant={candidate.selected ? "default" : "outline"}
                  size="sm"
                  className={candidate.selected ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => {
                    toggleCandidateSelection(candidate.id)
                    toast({
                      title: candidate.selected ? "Candidate unselected" : "Candidate selected",
                      description: `${candidate.name} has been ${candidate.selected ? "removed from" : "added to"
                        } your selection.`,
                      duration: 3000,
                    })
                  }}
                >
                  {candidate.selected ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    "Select Candidate"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
