param(
    [Parameter(Mandatory = $true)]
    [Alias('File')]
    [string]$DraftPath,
    [Parameter(Mandatory = $true)]
    [ValidateSet('yay', 'nay', 'needs_images', 'hold')]
    [string]$Verdict,
    [Parameter(Mandatory = $true)]
    [string]$Summary,
    [string]$Editor = 'website-manager',
    [string[]]$Feedback = @(),
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$SecurityStatus = 'pending',
    [string]$SecurityNotes = '',
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$ContextStatus = 'pending',
    [string]$ContextNotes = '',
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$FactsStatus = 'pending',
    [string]$FactsNotes = '',
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$DatesStatus = 'pending',
    [string]$DatesNotes = '',
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$WritingStatus = 'pending',
    [string]$WritingNotes = '',
    [ValidateSet('pass', 'fail', 'pending', 'not_applicable')]
    [string]$ImagesStatus = 'pending',
    [string]$ImagesNotes = '',
    [switch]$NoAutoPublish
)

$ErrorActionPreference = 'Stop'

$RepoPath = "W:\Websites\sites\ghost-in-the-models"
$RecorderScript = "W:\Websites\shared\website-tools\pipelines\articles\scripts\record-editorial-review.py"

function Get-NormalizedRelativePath {
    param(
        [string]$InputPath,
        [string]$Root
    )

    $CandidatePath = $InputPath
    if (-not [System.IO.Path]::IsPathRooted($CandidatePath)) {
        $CandidatePath = Join-Path $Root $CandidatePath
    }

    $FullPath = [System.IO.Path]::GetFullPath($CandidatePath)
    $RepoRoot = [System.IO.Path]::GetFullPath($Root)

    if (-not $FullPath.StartsWith($RepoRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "File must live inside the repo: $FullPath"
    }

    if (-not (Test-Path $FullPath)) {
        throw "File not found: $FullPath"
    }

    return $FullPath.Substring($RepoRoot.Length).TrimStart('\').Replace('\', '/')
}

$RelativePath = Get-NormalizedRelativePath -InputPath $DraftPath -Root $RepoPath

$Args = @(
    $RecorderScript,
    '--site', 'ghost-in-the-models',
    '--relative-path', $RelativePath,
    '--verdict', $Verdict,
    '--summary', $Summary,
    '--editor', $Editor,
    '--check', "security_sensitive_data=$SecurityStatus",
    '--check', "context_and_controversy=$ContextStatus",
    '--check', "facts_and_sourcing=$FactsStatus",
    '--check', "dates_and_chronology=$DatesStatus",
    '--check', "writing_edit=$WritingStatus",
    '--check', "images_and_media=$ImagesStatus"
)

if ($SecurityNotes) { $Args += @('--note', "security_sensitive_data=$SecurityNotes") }
if ($ContextNotes) { $Args += @('--note', "context_and_controversy=$ContextNotes") }
if ($FactsNotes) { $Args += @('--note', "facts_and_sourcing=$FactsNotes") }
if ($DatesNotes) { $Args += @('--note', "dates_and_chronology=$DatesNotes") }
if ($WritingNotes) { $Args += @('--note', "writing_edit=$WritingNotes") }
if ($ImagesNotes) { $Args += @('--note', "images_and_media=$ImagesNotes") }

foreach ($Item in $Feedback) {
    $Args += @('--feedback', $Item)
}

if ($NoAutoPublish) {
    $Args += '--no-auto-publish'
}

Write-Host "==================================================="
Write-Host "  Ghost in the Models - Editorial Review"
Write-Host "  File: $RelativePath"
Write-Host "  Verdict: $Verdict"
Write-Host "==================================================="

python @Args
if ($LASTEXITCODE -ne 0) {
    throw "Failed to record editorial review."
}

if ($Verdict -eq 'yay' -and -not $NoAutoPublish) {
    Write-Host "`nApproved review recorded. Ghost in the Models auto-publish policy has been applied." -ForegroundColor Green
} else {
    Write-Host "`nReview recorded." -ForegroundColor Green
}
